import { callApi } from "./callApi.js";

const url='https://randomuser.me/api/?results=1';

export const showUser = async () => {
  const data = await callApi(url);
  // console.log(data)
  let nameUser = document.getElementById("user");
  let mailUser = document.getElementById("mail");
  let phoneUser = document.getElementById("phone");
  let pictureUser = document.getElementById("picture");
  const img = document.createElement("img");
  img.src = data.results[0].picture.large;
  nameUser.innerHTML = ` ${data.results[0].name.first + " " + data.results[0].name.last}`;
  mailUser.innerHTML = ` ${data.results[0].email}`;
  phoneUser.innerHTML = ` ${data.results[0].phone}`;
  pictureUser.appendChild(img);
};
