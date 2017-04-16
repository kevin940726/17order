const uniqBy = (arr, key) => arr.filter(
  (item, i) => arr.findIndex(cur => cur[key] === item[key]) === i
);

export default uniqBy;
