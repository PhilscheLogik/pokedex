"use strict";
/**
 * Hier werden globale Objekte oder Variablen zugewiesen.
 */
// 1025 ist max
// https://pokeapi.co/api/v2/pokemon?offset=0&limit=50
// .result.length ist die max Anzahl

let maxNumber = 1000;
let stepNumber = 50;

let dataPokemon = [];

let currentIndex = 0;

let start = 0;
let end = 20;

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
