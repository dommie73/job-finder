const arrayToObject = array => (
  array.reduce((object, value) => {
    object[value] = value;
    return object;
  },
    {})
);

const arrayToObjectUppercase = array => (
  array.reduce((object, value) => {
    object[value] = value.toUpperCase();
    return object;
  },
    {})
);

const getInnerText = node => (
  [...node.childNodes]
    .filter(node => node.nodeType === Node.TEXT_NODE)
    .map(node => node.nodeValue)
    .join('')
    .trim()
);

module.exports = {
  arrayToObject,
  arrayToObjectUppercase,
  getInnerText
};