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
    let appdata = [];
    data.stat_by_country.forEach((element) => {
      appdata.push(element);
    });
    let temp = new Set();
    appdata.forEach((data) => {
      temp.add(data.total_cases);
    });
    console.log(temp, appdata);
    // let conf = Array.from(temp);
    // for (let i = 0; i <= conf.length / 2; i++) {
    //   console.log(conf[i]);
    // }
    // temp.forEach((e) => {
    //   console.log(e);
    // });

    // Date
    let date = new Set();
    appdata.forEach((data) => {
      // console.log(data.record_date);
      date.add(data.record_date.slice(0, 10));
    });
    console.log(date);
    let d = Array.from(date);
    d.forEach((e) => {
      console.log(e);
    });
  });
