// Select all the Elements
const countryName = document.querySelector(".country .name");
const totalCase = document.querySelector(".total-cases .value");
const newTotalCase = document.querySelector(".total-cases .newValue ");
const recoveredValue = document.querySelector(".recovered .value");
const newRecoveredValue = document.querySelector(".recovered .newValue ");
const deathValue = document.querySelector(".deaths .value");
const newDeathvalue = document.querySelector(".deaths .newValue ");

const ctx = document.getElementById("lineChart").getContext("2d");

// Get users Country Code
let countryCode = geoplugin_countryCode();

let userCountry;
country_list.forEach((country) => {
  if (countryCode == country.code) {
    userCountry = country.name;
    // console.log(userCountry);
  }
});

function fetchData(userCountry) {
  fetch("https://api.covid19api.com/summary")
    .then((response) => response.json())
    .then((data) => {
      let countryData = [];
      data.Countries.forEach((ele) => {
        countryData.push(ele);
      });

      countryData.forEach((country) => {
        if (country.Country == userCountry) {
          countryName.innerHTML = country.Country;
          totalCase.innerHTML = country.TotalConfirmed;
          recoveredValue.innerHTML = country.TotalRecovered;
          deathValue.innerHTML = country.TotalDeaths;

          newTotalCase.innerHTML = country.NewConfirmed;
          newRecoveredValue.innerHTML = country.NewRecovered;
          newDeathvalue.innerHTML = country.NewDeaths;
          if (totalCase.innerHTML == 0) {
            location.reload();
          }
          // console.log(country.Country, userCountry);
        }
        console.log(country);
      });
    })
    .catch((err) => console.log(err));
}

fetchData(userCountry);
