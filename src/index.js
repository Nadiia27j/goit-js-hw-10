import './css/styles.css';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const refs = {
    inputEl: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();
  const nameCountry = refs.inputEl.value.trim();

    fetchCountries(nameCountry)
    .then(onCountry)
    .catch(onError)
    
}


function fetchCountries(countries) {
 return fetch(`https://restcountries.com/v3.1/name/${countries}`)
  .then(response => {
    if (!response.status === 200) {
        throw new Error(response.status);;
    } 
    return response.json();
  });
  
}

function onCountry(countries) {
    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }

    if (countries.length > 2 && countries.length < 10) {
        const list = country.map(({flags, name}) => {
            return `<li class="country-info__item"><img src="${flags.svg}" alt="" width="50"><h2>${name.official}</h2></li>`
        })
       refs.countryList.innerHTML = list;
    }

   
    const markup = countries.map(({ flags, name, capital, population, languages}) => {
        if (countries.length === 1) {
            return `<div>
            <img src="${flags.svg}" alt="${name.official}" width="50">
            <h2>${name.official}</h2>
            <p>Capital:${capital}</p>
            <p>Population:${population}</p>
            <p>Languages:${Object.values(languages)}</p>
            </div>`
        }
    }).join('')
    refs.countryInfo.innerHTML = markup;
    console.log(markup);
}
    

function onError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name.');
}
