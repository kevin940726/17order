import dateFormat from 'dateformat';

export const mapTimestampToDate = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  now.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (now.getTime() === date.getTime()) {
    return 'Today';
  } else if (new Date(now.setDate(now.getDate() - 1)).getTime() === date.getTime()) {
    return 'Yesterday';
  }

  return dateFormat(date, 'yyyy/mm/dd');
};

export const getShortDate = (timestamp) => {
  const date = new Date(timestamp);

  return dateFormat(date, 'HH:MM');
};
