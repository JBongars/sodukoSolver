const range = (start, end, step = 1) => Array.from({
  length: (end - start) / step
}, (_, i) => start + i * step);

module.exports = {
  range
};
