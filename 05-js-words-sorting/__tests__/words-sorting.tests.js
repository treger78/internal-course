const wordsSorting = require("../words-sorting");

test.each([
  ["Died last night in my dreams", ["in","my","Died","last","night","dreams"]],
  ["Walking the streets", ["the","streets","Walking"]],
  ["Of some old ghost town", ["Of","old","some","town","ghost"]],
  ["I tried to believe", ["I","to","tried","believe"]],
  ["In God and James Dean", ["In","and","God","Dean","James"]],
  ["But Hollywood sold out", ["But","out","sold","Hollywood"]],
  ["& what about .. hhmm, some characters & 025 922", ["hhmm","some","what","about","characters"]],
  ["12345", []],
  [" ", []],
  ["   ", []],
  ["", []],
  ["abb aab", ["aab", "abb"]],
])('test wordsSorting', (line, expected) => {
  expect(wordsSorting(line)).toStrictEqual(expected);
});
