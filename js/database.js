"use strict";
/** DE Anmerkung
 * Hier werden globale Objekte oder Variablen zugewiesen.
 * Quellen:
 * https://pokeapi.co/api/v2/pokemon?offset=0&limit=50
 * https://pokeapi.co/api/v2/pokemon/1/
 * https://pokeapi.co/api/v2/evolution-chain/1/
 */

let maxNumber = 1025; 
let stepNumber = 40;
let start = 0;
let end = 20;

let dataAllPokemon = [];
let dataPartPokemon = [];

let currentIndex = 0;
let selectedIndex = 1;

let searchPhrase = "";

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

/** DE Pokémon-Daten abrufen
 * Lädt Pokémon-Daten von der API und speichert sie.
 * @param {number} index - ID des Pokémon in der API.
 */
/** ENG Fetch Pokémon data
 * Fetches Pokémon data from the API and stores it.
 * @param {number} index - ID of the Pokémon in the API.
 */
const fetchDataPokeJson = async (index) => {
  try {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`);
    let responseJson = await response.json();
    dataAllPokemon.push(responseJson);
  } catch (error) {
    console.log(error);
    dataAllPokemon.push({ msg: error });
  }
};
