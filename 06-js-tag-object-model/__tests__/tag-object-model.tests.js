const tagObjectModel = require('../tag-object-model');

test.each([
  ['<div>This is first html line without atr</div>', {
    tagName: 'div',
    tagContent: 'This is first html line without atr',
    tagAttributes: {}
  }],
  ['<div class="one">This is second html line with atr</div>', {
    tagName: 'div',
    tagContent: 'This is second html line with atr',
    tagAttributes: {
      class: "one"
    }
  }],
  ['<div></div>', {
    tagName: 'div',
    tagContent: null,
    tagAttributes: {}
  }],
  ['<div class="one"></div>', {
    tagName: 'div',
    tagContent: null,
    tagAttributes: {
      class: "one"
    }
  }],
  ['<input />', {
    tagName: 'input',
    tagContent: null,
    tagAttributes: {}
  }],
  ['<input type="text" />', {
    tagName: 'input',
    tagContent: null,
    tagAttributes: {
      type: "text"
    }
  }],
  ['<input required />', {
    tagName: 'input',
    tagContent: null,
    tagAttributes: {
      required: true
    }
  }],
  ['<input type="text" required />', {
    tagName: 'input',
    tagContent: null,
    tagAttributes: {
      type: "text",
      required: true
    }
  }],
  ['<input>', {
    tagName: 'input',
    tagContent: null,
    tagAttributes: {}
  }],
  ['some text', {
    tagName: null,
    tagContent: null,
    tagAttributes: {}
  }],
  [, {}],
  ['<button id="div_id" type="submit" disabled>Button name</button>', {
    tagName: "button",
    tagContent: "Button name",
    tagAttributes: {
      id: "div_id",
      type: "submit",
      disabled: true
    }
  }],
])('test tagObjectModel', (htmlLine, expected) => {
  expect(tagObjectModel(htmlLine)).toStrictEqual(expected);
});
