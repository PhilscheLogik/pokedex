"use strict";
/**
 * Hier werden globale Objekte oder Variablen zugewiesen.
 */
// https://pokeapi.co/api/v2/pokemon?offset=0&limit=50
// https://pokeapi.co/api/v2/pokemon/1/
// https://pokeapi.co/api/v2/evolution-chain/1/

let maxNumber = 1000; 
let stepNumber = 20;

let dataPokemon = [];

let currentIndex = 0;

let start = 0;
let end = 10;

let selectedIndex = 0;

const typeColors = {
  fire: "orange",
  water: "blue",
  grass: "green",
  electric: "yellow",
  ice: "lightblue",
  fighting: "brown",
  poison: "purple",
  ground: "sandybrown",
  flying: "skyblue",
  psychic: "pink",
  bug: "chartreuse",
  rock: "gray",
  ghost: "indigo",
  dragon: "goldenrod",
  dark: "black",
  steel: "silver",
  fairy: "hotpink",
  normal: "beige",
};

const fetchDataPokeJson = async (index) => {
  try {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`);
    let responseJson = await response.json();
    dataPokemon.push(responseJson);
  } catch (error) {
    console.log(error);
    //  document.getElementById("main-content").innerHTML = renderError(error);
    dataPokemon.push({ msg: error });
  }
};
