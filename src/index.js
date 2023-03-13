import './css/styles.css';
import debounce from 'lodash.debounce';
import { refs } from './js-modules/refs';
import { fetchCountries } from './js-modules/fetchCountries';
import renderFunctions from './js-modules/renderCountries';
import { clearText, clearAll } from './js-modules/clearFuncs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const { renderCountriesList, renderCountryInfo } = renderFunctions;
const { inputEl, countryListEl, countryInfoEl } = refs;
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(findCountry, DEBOUNCE_DELAY));

function findCountry(evt) {
  const inputValue = evt.target.value;
  if (inputValue.trim() === '') {
    clearAll(countryInfoEl, countryListEl);
    return;
  }
  fetchCountries(inputValue)
    .then(data => {
      if (data.length > 10) {
        clearAll(countryInfoEl, countryListEl);
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (data.length > 1) {
        clearText(countryInfoEl);
        renderCountriesList(data, countryListEl);
        return;
      }
      if (data.length == 1) {
        clearText(countryListEl);
        renderCountryInfo(data, countryInfoEl);
        return;
      }
    })
    .catch(error => {
      return;
    });
}
