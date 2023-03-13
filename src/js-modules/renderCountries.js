function renderCountryInfo(arr, element) {
  const infoMarkup = arr
    .map(({ flags, name, capital, population, languages }) => {
      return `<h1 class = "country-info__title"><img src = "${flags.png}">${
        name.official
      }</h1>
      <p class = "country-info__text" ><span class ="country-info__text--accent">Population:</span> ${population}</p>
      <p class = "country-info__text" ><span class ="country-info__text--accent">Capital:</span> ${capital}</p>
      <p class = "country-info__text" ><span class ="country-info__text--accent">Languages:</span> ${Object.values(
        languages
      )}</p>`;
    })
    .join('');
  element.innerHTML = infoMarkup;
}
function renderCountriesList(arr, element) {
  const listMarkup = arr
    .map(({ flags, name }) => {
      return `<li class = "js-country"><img src = "${flags.png}">${name.official}</li>`;
    })
    .join('');
  element.innerHTML = listMarkup;
}
export default { renderCountriesList, renderCountryInfo };
