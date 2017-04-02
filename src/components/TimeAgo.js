import React from 'react';
import DefaultTimeAgo from 'react-timeago';

const formatter = (value, unit, suffix, date, defaultFormatter) => {
  if (value === 0 && unit === 'second' && suffix === 'ago') {
    return 'just now';
  }

  return defaultFormatter(value, unit, suffix, date, defaultFormatter);
}

const TimeAgo = (props) => (
  <DefaultTimeAgo
    formatter={formatter}
    minPeriod={10}
    {...props}
  />
);

export default TimeAgo;
