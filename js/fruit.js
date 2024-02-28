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

const checkPriceGas = async(event) => {
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
    //destroyChart();
    crearChart(gasStations);
    cls_input();
};

function showPriceGas(gasStations) {
    const fuelsDetailsElement = document.getElementById("fuels-details");

    gasStations.forEach(function(gasStation) {
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
                              <div id="accordion">
                            <div class="card">
                                <div class="card-header" id="headingTwo">
                                  <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <h6>${gasStation.distribuidor.marca}  </h6>
                                    <p>${gasStation.ubicacion.direccion},${gasStation.ubicacion.nombre_comuna}
                                    </p>
                                    </button>
                                  </h5>
                              </div>
                              <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                  <div class="card-body">
                                  <p>Combustible 93:  $ ${Math.round(b93)}</p>
                                  <p>Combustible 95:  $ ${Math.round(b95)}</p>
                                  <p>Combustible 97:  $ ${Math.round(b97)}</p>
                                  </div>
                                </div>
                              </div>
                            </div>    `;
            fuelsDetailsElement.appendChild(list);
        }
    });
}




function crearChart(gasStations) {
    //aca deberia recibir los array de datos listo de la funcion anterior

    const graph = document.getElementById("graphic-fuels");



    let station = [];
    let price_93 = [];
    let price_95 = [];
    let price_97 = [];
    const key93 = 93;
    const key95 = 95;
    const key97 = 97;
    gasStations.forEach(function(gasStation) {
        station.push(gasStation.distribuidor.marca);
        prueba = Object.values(gasStation);

        if ((hasKey93 = Object.keys(prueba[2]).some((x) => x == key93))) {
            price_93.push(prueba[2][93].precio);
        } else {
            price_93.push(0);
        }

        if ((hasKey95 = Object.keys(prueba[2]).some((x) => x == key95))) {
            price_95.push(prueba[2][95].precio);
        } else {
            price_95.push(0);
        }

        if ((hasKey97 = Object.keys(prueba[2]).some((x) => x == key97))) {
            price_97.push(prueba[2][97].precio);
        } else {
            price_97.push(0);
        }
    });

    const labels = station;

    const dataset1 = {
        label: "93",
        data: price_93,
        borderColor: "rgba(248, 37, 37, 0.8)",
        backgroundColor: "rgba(248, 37, 37, 0.8)",
        fill: false,
        tension: 0.1,
    };

    const dataset2 = {
        label: "95",
        data: price_95,
        borderColor: "rgba(69, 248, 84, 0.8)",
        backgroundColor: "rgba(69, 248, 84, 0.8)",
        fill: false,
        tension: 0.1,
    };

    const dataset3 = {
        label: "97",
        data: price_97,
        borderColor: "rgba(69, 140, 248, 0.8)",
        backgroundColor: "rgba(69, 140, 248, 0.8)",
        fill: false,
        tension: 0.1,
    };



    const data = {
        labels: labels,
        datasets: [dataset1, dataset2, dataset3],
    };

    const config = {
        type: "bar",
        data: data,
    };







    let myChart = new Chart(graph, config);


    // Para destruir el lienzo


    function destroyChart() {
        myChart.destroy();

    }




}



function cls_input() {
    document.getElementById("input-search").value = "";
}