export function clearTextContent(element) {
  element.innerHTML = '';
}
export function clearAllTextContent(el1, el2) {
  clearTextContent(el1);
  clearTextContent(el2);
}
