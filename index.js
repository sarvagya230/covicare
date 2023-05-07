import dataJson from './csvjson.json'assert { type: "json" };
import indiaCovid from './indiaCovid.json' assert{type:'json'};
console.log(indiaCovid)
console.log(dataJson)
var countries = [];
var positiveData=[];
for(var i in dataJson)
{
    countries.push([dataJson [i].Name,dataJson [i]['Cases - cumulative total']]);
    
}
for( var i in indiaCovid){
  positiveData.push([indiaCovid [i].Date_reported,indiaCovid [i].Cumulative_cases])
}
console.log(positiveData)
console.log(countries)    
countries.unshift(["Countries","cases"])
positiveData.unshift(["date posted","cases"])
const data=[]

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

  const api_fetch = async (country) => {

    await fetch(
      "https://api.covid19api.com/total/country/" + country + "/status/confirmed",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          const obj = document.getElementById("value");
          obj.innerHTML=entry.Cases
          data.push(entry.Cases)
          
        });
      });
      
    await fetch(
      "https://api.covid19api.com/total/country/" + country + "/status/deaths",
      requestOptions
    ) .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.forEach((entry) => {
        const obj = document.getElementById("Value2");
        obj.innerHTML=entry.Cases
       
      });
    });
    
    await fetch(
      "https://api.covid19api.com/total/country/India/status/recovered",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
        
        });
    });
    }

api_fetch('India');
let startTimestamp = null;
const step = (timestamp) => {
if (!startTimestamp) startTimestamp = timestamp;
const progress = Math.min((timestamp - startTimestamp) / 1, 1);
if (progress < 1) {
  window.requestAnimationFrame(step);
}
};
window.requestAnimationFrame(step);

 google.charts.load('current', {
    'packages':['geochart'],
  });
  google.charts.setOnLoadCallback(drawRegionsMap);
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);


      function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable(countries)
   

    var options = {
        colorAxis: {colors: ['#fff', '#301c94']},
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
  }
  function drawChart() {
        var data = google.visualization.arrayToDataTable(positiveData);

        var options = {
          
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }


