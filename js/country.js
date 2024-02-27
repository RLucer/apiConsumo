import { callApi } from "./callApi.js";

const url = "https://restcountries.com/v3.1/subregion/South America";

export const showCountry = async () => {
  const countrys = await callApi(url);
  //console.log(countrys);

  let pais = [];
  let poblacion = [];
  let area = [];

  pais = countrys.map((country) => country.name.common );
  poblacion = countrys.map(country => country.population);
  area = countrys.map(country => country.area);

  // console.log(pais);

  const ctx = document.getElementById("graphic");
 
  const mixedChart = new Chart(ctx, {
    data: {
        datasets: [{
            type: 'line',
            label: 'Area Superficie',
            data: area
        }, {
            type: 'bar',
            label: 'Poblacion',
            data: poblacion,
        }],
        labels: pais
    },
    options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
});



};
