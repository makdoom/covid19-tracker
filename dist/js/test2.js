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

    let date = new Set();
    appdata.forEach((d) => {
      date.add(d.record_date.slice(0, 10));
    });
    let dateArr = Array.from(date);
    for (let i = 0; i < dateArr.length / 2; i++) {
      //   console.log(dateArr[i]);
    }

    function getConfirm(userdate) {
      appdata.some(function (value) {
        if (value.record_date.slice(0, 10) === userdate) {
          console.log(value.total_cases);
          return true;
        }
      });

      //   appdata.forEach((e) => {
      //     if (e.record_date.slice(0, 10) === userdate) {
      //       let temp = e.total_cases;
      //       console.log(temp);
      //     }
      //   });
    }
    // console.log(dateArr[0]);
    getConfirm(dateArr[0]);

    {
      // Date
      // let date = new Set();
      // appdata.forEach((data) => {
      //   // console.log(data.record_date);
      //   date.add(data.record_date.slice(0, 10));
      // });
      // console.log(date);
      // let d = Array.from(date);
      // d.forEach((e) => {
      //   console.log(e);
      // });
    }
  });
