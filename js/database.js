"use strict";
/** DE Anmerkung
 * Hier werden globale Objekte oder Variablen initialisiert sowie die Fetch Funktion gespeichert
 
 * Quellen:
 * https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025
 * https://pokeapi.co/api/v2/pokemon/1/
 * https://pokeapi.co/api/v2/evolution-chain/1/
 */

let maxNumber = 1025; 
let stepNumber = 20;
let start = 0;
let end = 150;

let resultsPokeData;
let dataAllPokemon = [];
let dataPartPokemon = [];
let evoPokemon = [];

let test;

let currentIndex = 0;
let selectedIndex = 1;

let searchPhrase = "";

let soundValue = 0.4;

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

// Führt leider zu Fehlern, wenn (maxNumber > 1025), da die Daten dann in inkonsistent werden
// const fetchMaxPokeJson = async () => {
//   try {
//     let response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
//     let { count } = await response.json();
//     maxNumber = count;  
//   } catch (error) {
//     console.log(error);
//   }
// };

/** DE Pokémon-Daten abrufen
 * Lädt die URLs der Pokémon Daten von der API und speichert sie.
 */
/** ENG Fetch Pokémon data
 * Fetches urls of Pokémon data from the API and stores it.
 */
const fetchResultPokeJson = async () => {
  try {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${maxNumber}`);
    let { results } = await response.json();
    resultsPokeData = results;  
  } catch (error) {
    console.log(error);
  }
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
    let response = await fetch(`${resultsPokeData[index].url}`);
    let responseJson = await response.json();
    dataAllPokemon.push(responseJson);
  } catch (error) {
    console.log(error);
  }
};

const fetchEvoPokeJson = async (index) => {
  try {
    let response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${index+1}/`);
    let responseJson = await response.json();
    evoPokemon.push(responseJson);  
  } catch (error) {
    console.log(error);
  }
};