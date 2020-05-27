// Global Varibels
let appdata = [],
  date = [],
  casesList = [],
  recoveredList = [],
  deathList = [];

fetch(
  "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=india",
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
    data.stat_by_country.forEach((element) => {
      appdata.push(element);
    });

    let dates = new Set();
    appdata.forEach((d) => {
      dates.add(d.record_date.slice(0, 10));
    });
    let dateTempArr = Array.from(dates);

    // pushing dates to to dates array
    for (let i = 0; i < dateTempArr.length / 2; i++) {
      date.push(dateTempArr[i]);
    }
    // console.log(date);

    // Function to create total, recoverd and death lists
    function createLists(givenDate) {
      appdata.some(function (value) {
        if (value.record_date.slice(0, 10) === givenDate) {
          // pushing total cases to casesList array
          casesList.push(value.total_cases);
          // pushing Recovered cases to recoveredList array
          recoveredList.push(value.total_recovered);
          // pushing total cases to casesList array
          deathList.push(value.total_deaths);
          // console.log(value.total_cases);
          return true;
        }
      });
    }

    date.forEach((ele) => createLists(ele));
    // console.log(casesList, date, appdata);
    console.log(recoveredList);
  });
