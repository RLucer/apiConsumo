import { callApi } from "./callApi.js";

const url = "https://mindicador.cl/api";

export const showIndicator = async () => {
  const data = await callApi(url);
//   console.log(data);

  let bitcoin = document.getElementById("bitcoin");
  let dolar = document.getElementById("dolar");
  let uf = document.getElementById("uf");
  let euro = document.getElementById("euro");
 

  dolar.innerHTML = `Dolar ${data.dolar.valor}`;
  bitcoin.innerHTML = `Bitcoin ${data.bitcoin.valor}`;
  uf.innerHTML = `UF ${data.uf.valor}`;
  euro.innerHTML = `Euro ${data.euro.valor}`;
  
};
