const REGEX = /^thumb_(\d+)$/g;

export const getResolution = key => {
  const group = REGEX.exec(key);
  REGEX.lastIndex = 0;

  if (group && group.length) {
    return Number(group[1]);
  }

  return null;
};

export const getThumbs = img => (
  Object.entries(img)
    .filter(([key]) => key.match(REGEX))
);

export const sortThumbs = thumbs => (
  thumbs
    .sort(([keyA], [keyB]) => {
      if (getResolution(keyA) > getResolution(keyB)) {
        return -1;
      }

      return 1;
    })
);

const getHightestThumb = (img) => {
  const sorted = sortThumbs(getThumbs(img));
  
  if (sorted.length) {
    return {
      key: sorted[0][0],
      resolution: getResolution(sorted[0][0]),
      value: sorted[0][1],
    };
  }

  return null;
};

export default getHightestThumb;
