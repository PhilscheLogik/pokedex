"use strict";
/**
 * Hier werden globale Objekte oder Variablen zugewiesen.
 */
// 1025 ist max
// https://pokeapi.co/api/v2/pokemon?offset=0&limit=50
// .result.length ist die max Anzahl 

let dataPokemon=[];

let start = 0;
let end = 2;


const fetchDataPokeJson = async (index) => {
    try {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`);
      let responseJson = await response.json();
      dataPokemon.push(responseJson);    
    } catch (error) {
      console.log(error);
      //  document.getElementById("main-content").innerHTML = renderError(error);
      dataPokemon.push({msg: error});
    }
  };