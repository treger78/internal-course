function wordsSorting(line) {
  return line
    .replace(/[^a-zа-я\s]+/gi, '')
    .split(' ')
    .filter((word) =>  word !== '')
    .sort((a, b) => a.length - b.length || a.localeCompare(b));
}

module.exports = wordsSorting;
