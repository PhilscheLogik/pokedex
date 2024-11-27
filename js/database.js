"use strict";
/**
 * Hier werden globale Objekte oder Variablen zugewiesen.
 */
// 1025 ist max
let dataArray=[];

let start = 0;
let end = 3;


const fetchDataGOTJson = async () => {
    try {
      let response = await fetch("https://pokeapi.co/api/v2/pokemon");
      let responseJson = await response.json();
      dataArray = responseJson;
    //   createCards();
    } catch (error) {
      document.getElementById("main-content").innerHTML = renderError(error);
    }
  };