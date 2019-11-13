const arrayToObject = array =>
  array.reduce((object, value) => {
    object[value] = value;
    return object;
  }, {});

const arrayToObjectUppercase = array =>
  array.reduce((object, value) => {
    object[value] = value.toUpperCase();
    return object;
  }, {});

const getInnerTextWithTextNodesOnly = node =>
  [...node.childNodes]
    .filter(node => node.nodeType === Node.TEXT_NODE)
    .map(node => node.nodeValue)
    .join("")
    .trim();

const getInnerTextWithNoWhitespace = node =>
  [...node.childNodes]
    .map(node => node.textContent)
    .join("")
    .replace(/\s\s+/g, " ")
    .trim();

module.exports = {
  arrayToObject,
  arrayToObjectUppercase,
  getInnerTextWithNoWhitespace,
  getInnerTextWithTextNodesOnly
};
