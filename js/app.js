// Select all the Elements
const countryName = document.querySelector(".country .name");
const totalCase = document.querySelector(".total-cases .value");
const newTotalCase = document.querySelector(".total-cases .newValue ");
const recoveredValue = document.querySelector(".recovered .value");
const deathValue = document.querySelector(".deaths .value");
const newDeathValue = document.querySelector(".deaths .newValue ");

const ctx = document.getElementById("lineChart").getContext("2d");

// Global Varibels
let appdata = [],
  date = [],
  casesList = [],
  newCasesList = [],
  recoveredList = [],
  deathList = [],
  newDeathList = [],
  formatedDates = [];

// Get users Country Code
let countryCode = geoplugin_countryCode();

let userCountry;
country_list.forEach((country) => {
  if (countryCode == country.code) {
    userCountry = country.name;
  }
});

function fetchData(userCountry) {
  countryName.innerHTML = "Loading...";
  fetch(
    `https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=${userCountry}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "8541ca4644mshfd4577d0fd40f33p12686bjsn9e24de5883ec",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // clearing all lists
      clearList();

      data.stat_by_country.forEach((element) => {
        appdata.push(element);
      });

      let dates = new Set();
      appdata.forEach((d) => {
        dates.add(d.record_date.slice(0, 10));
      });
      let dateTempArr = Array.from(dates);

      // pushing dates to to dates array
      for (let i = 0; i < dateTempArr.length / 2 - 6; i++) {
        date.push(dateTempArr[i]);
      }
      date.reverse();
      date.forEach((e) => formatedDates.push(formatDate(e)));
      //   to Create Lists
      date.forEach((ele) => createLists(ele));
    })
    .then(() => updatesUI(userCountry))
    .catch((err) => console.log(err, "Oops!! Something Went Wrong.."));

  function updatesUI(cont) {
    displayStats(cont);
    linearChart();
  }

  // Function to create total, recoverd and death lists
  function createLists(givenDate) {
    appdata.some(function (value) {
      if (value.record_date.slice(0, 10) === givenDate) {
        // pushing total cases to casesList array
        casesList.push(value.total_cases.replace(/,/g, ""));
        // pushing total new cases to newcasesList array
        newCasesList.push(value.new_cases.replace(/,/g, ""));
        // pushing Recovered cases to recoveredList array
        recoveredList.push(value.total_recovered.replace(/,/g, ""));
        // pushing total cases to casesList array
        deathList.push(value.total_deaths.replace(/,/g, ""));
        // pushing new death cases to newDeathList array
        newDeathList.push(value.new_deaths.replace(/,/g, ""));
        // console.log(value.total_cases);
        return true;
      }
    });
  }

  //   Function to Display lists
  function displayStats(country) {
    countryName.innerHTML = country;
    // show total cases
    if (casesList[casesList.length - 1] !== "")
      totalCase.innerHTML = casesList[casesList.length - 1];
    else totalCase.innerHTML = casesList[casesList.length - 2];

    // Show new Casese
    if (newCasesList[newCasesList.length - 1] !== "")
      newTotalCase.innerHTML = newCasesList[newCasesList.length - 1];
    else newTotalCase.innerHTML = newCasesList[newCasesList.length - 2];

    // show recoverd cases
    if (recoveredList[recoveredList.length - 1] !== "")
      recoveredValue.innerHTML = recoveredList[recoveredList.length - 1];
    else recoveredValue.innerHTML = recoveredList[recoveredList.length - 2];

    // show death cases and new death cases
    if (deathList[deathList.length - 1] !== "")
      deathValue.innerHTML = deathList[deathList.length - 1];
    else deathValue.innerHTML = deathList[deathList.length - 2];

    // Show New Death Cases
    if (newDeathList[newDeathList.length - 1] !== "")
      newDeathValue.innerHTML = newDeathList[newDeathList.length - 1];
    else newDeathValue.innerHTML = newDeathList[newDeathList.length - 2];

    console.log(formatedDates);
  }
}

// function to display chart
let myChart;
function linearChart() {
  let cont = userCountry;
  if (myChart) {
    myChart.destroy();
  }
  Chart.defaults.global.defaultFontColor = "#e0e0e0";
  Chart.defaults.global.defaultFontFamily = "Poppins";
  Chart.defaults.global.defaultFontSize = 14;
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Total Cases",
          data: casesList,
          fill: false,
          borderColor: "#fff",
          backgroundColor: "#fff",
          borderWidth: 1,
        },
        {
          label: "Recovered Cases",
          data: recoveredList,
          fill: false,
          borderColor: "#1cff39",
          backgroundColor: "#1cff39",
          borderWidth: 1,
        },
        {
          label: "Death Cases",
          data: deathList,
          fill: false,
          borderColor: "red",
          backgroundColor: "red",
          borderWidth: 1,
        },
      ],
      labels: formatedDates,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

// Delete previous Array values
function clearList() {
  appdata.length = 0;
  date.length = 0;
  casesList.length = 0;
  newCasesList.length = 0;
  recoveredList.length = 0;
  deathList.length = 0;
  newDeathList.length = 0;
  formatedDates.length = 0;
}

// Format Dates
const monthsName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(dateString) {
  let date = new Date(dateString);
  return `${date.getDate()} ${monthsName[date.getMonth()]}`;
}
document.addEventListener("DOMContentLoaded", fetchData(userCountry));
