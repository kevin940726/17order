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
    .map(([key, value]) => ({
      key,
      value,
      resolution: getResolution(key),
    }))
);

export const sortThumbs = thumbs => (
  thumbs
    .sort((a, b) => {
      if (a.resolution > b.resolution) {
        return -1;
      }

      return 1;
    })
);

export const getHightestThumb = (img) => {
  const sorted = sortThumbs(getThumbs(img));
  
  if (sorted.length) {
    return sorted[0];
  }

  return null;
};

export const getFitThumb = (img) => {
  const sorted = sortThumbs(getThumbs(img));
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (sorted.length) {
    const fitThumbs = sorted.filter(thumb => (
      thumb.resolution / windowWidth * windowHeight < windowWidth / 2
    ));

    return fitThumbs.length ? fitThumbs[0] : sortThumbs[0];
  }

  return null;
};
