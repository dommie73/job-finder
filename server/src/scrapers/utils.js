const getInnerText = node =>
  [...node.childNodes]
    .filter(node => node.nodeType === Node.TEXT_NODE)
    .map(node => node.nodeValue)
    .join('')
    .trim();

module.exports = {
  getInnerText
};