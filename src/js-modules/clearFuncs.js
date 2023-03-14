export function clearTextContent(...args) {
  args.forEach(element => {
    element.innerHTML = '';
  });
}
