// Fuente : sitio web
// https://cne-ti.atlassian.net/wiki/external/2195357697/ZjZkZGNiMTRkMjJiNDMxMTg2NWY4NGVlMGJmMmVhMmM

const urlToken =
  "https://api.cne.cl/api/login?email=lucero.ricardo@gmail.com&password=Ju271216";

// la api solicita un token por consulta y acá lo obtengo
async function postToken() {
  const resp = await fetch(urlToken, {
    method: "POST",
    headers: {
      "Content-Type": "aplllication/json",
    },
    body: "",
  });
  const jsonResponse = await resp.json();
  return jsonResponse.token;
}

const urlGas = "https://api.cne.cl/api/v4/estaciones";
let fuels = [];

const checkPriceGas = async (event) => {
  event.preventDefault();
  const input = document.getElementById("input-search");
  const searchInput = input.value;

  const token = await postToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await axios.get(urlGas, { headers: headers });
  console.log(response.data);

  // creo un nuevo arreglo de objetos con los datos que necesito
  const fuelsData = response.data.map((fuel) => ({
    distribuidor: fuel.distribuidor,
    ubicacion: fuel.ubicacion,
    precios: fuel.precios,
  }));
  // filtro lo que me piden
  const gasStations = fuelsData.filter(
    (fuel) => fuel.ubicacion.nombre_comuna == searchInput
  );

  // console.log(gasStations);
  // llamar la funcion para mostrar
  const cls = document.getElementById("fuels-details");

  cls.innerHTML = "";

  showPriceGas(gasStations);
  cls_input();
};

function showPriceGas(gasStations) {
  const fuelsDetailsElement = document.getElementById("fuels-details");
  gasStations.forEach(function (gasStation) {
    const list = document.createElement("li");
    if (gasStation) {
      //creo un array porque el nombre de la clave del objeto es numerico
      let prueba = [];
      prueba = Object.values(gasStation);
      console.log(prueba);
      //-----

      const key93 = 93;
      const key95 = 95;
      const key97 = 97;

      if ((hasKey93 = Object.keys(prueba[2]).some((x) => x == key93))) {
        b93 = prueba[2][93].precio;
      } else {
        b93 = 0;
      }

      if ((hasKey95 = Object.keys(prueba[2]).some((x) => x == key95))) {
        b95 = prueba[2][95].precio;
      } else {
        b95 = 0;
      }

      if ((hasKey97 = Object.keys(prueba[2]).some((x) => x == key97))) {
        b97 = prueba[2][97].precio;
      } else {
        b97 = 0;
      }

      //agrego a la lista que voy a mostrar

      list.innerHTML = `
        
          <h4>Estacion:  ${gasStation.distribuidor.marca}</h4>
          <p>Precio 93: ${Math.round(b93)}</p>
          <p>Precio 95: ${Math.round(b95)}</p>
          <p>Precio 97: ${Math.round(b97)}</p>
         <p>Direccion: ${gasStation.ubicacion.direccion},   ${
        gasStation.ubicacion.nombre_comuna
      } </p>
   
         
        
      `;
      fuelsDetailsElement.appendChild(list);
      comun = [];
      comun.push(prueba);
    }
  });
  crearChart(gasStations);
}

function cls_input() {
  document.getElementById("input-search").value = "";
}

function crearChart(gasStations) {
  //
 
  //const stations = gasStationss.map(gasStation => gasStation.distribuidor.direccion)
  let station = [];
  let price = [];
  gasStations.forEach(function (gasStation) {
      station.push(gasStation.distribuidor.marca)
      prueba = Object.values(gasStation);
      price = prueba[2][93].precio
      
  });
    
  

  const grapFuel = document.getElementById("graphic-fuels");

  const labels = station;

 
  
  const data = {
      labels: labels,
      datasets: [{
          label:"Ejemplo 1",
          data: price,
          backgroundColor: 'rgba(9, 129, 176, 0.2)'
      }]
  };
  
  const config = {
      type: 'bar',
      data: data,
  };
  
  new Chart(grapFuel , config);
}
