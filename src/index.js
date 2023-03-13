import './css/styles.css';
import debounce from 'lodash.debounce';
import { refs } from './js-modules/refs';
import { fetchCountries } from './js-modules/fetchCountries';
import renderFunctions from './js-modules/renderCountries';
import { clearTextContent, clearAllTextContent } from './js-modules/clearFuncs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const { renderCountriesList, renderCountryInfo } = renderFunctions;
const { inputEl, countryListEl, countryInfoEl } = refs;
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(findCountry, DEBOUNCE_DELAY));

function findCountry(evt) {
  const trimmedInputValue = evt.target.value.trim();
  if (trimmedInputValue === '') {
    clearAllTextContent(countryInfoEl, countryListEl);
    return;
  }
  fetchCountries(trimmedInputValue)
    .then(data => {
      if (data.length > 10) {
        clearAllTextContent(countryInfoEl, countryListEl);
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (data.length > 1) {
        clearTextContent(countryInfoEl);
        renderCountriesList(data, countryListEl);
        return;
      }
      if (data.length == 1) {
        clearTextContent(countryListEl);
        renderCountryInfo(data, countryInfoEl);
        return;
      }
    })
    .catch(error => {
      return;
    });
}
