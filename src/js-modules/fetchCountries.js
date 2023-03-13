import { Notify } from 'notiflix';
import { refs } from './refs';
import { clearAllTextContent } from './clearFuncs';

const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountries(name) {
  return fetch(
    `${BASE_URL}${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (response.status === 404) {
      Notify.failure('Oops, there is no country with that name');
      clearAllTextContent(refs.countryInfoEl, refs.countryListEl);
      return;
    }
    return response.json();
  });
}
export { fetchCountries };
