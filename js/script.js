"use strict";

/** Anmerkung
 * Neigung der kleinen Cards ist bei Google Chrome und Edge leicht unscharf -> liegt an der Engine
 * 
 */

/** Allgemeine Info 
 * 
 * check 6 -> 6 cards Layout abändern -> https://codepen.io/mikemang/pen/GRrBRZM https://codepen.io/MEDALI1977/pen/VwaREaV
 * check 7a -> 7a card info Layout abändern -> https://codepen.io/genarocolusso/pen/PoGzXwa
 * check 8a -> 8a BUG: nach filter wird Gallery nicht korrekt durchgeführt
 * check 8b -> 8b BUG: Reiter About wird immer durch die Klasse selected ausgewählt wurde, auch wenn die Gallery weiter geht
 * 9 Stats in der navbar
 * 10 neue Dateneinlesung mit dem https://pokeapi.co/api/v2/pokemon?offset=0&limit=50 results
 * 11 Evo in der navbar
 * 12 sound vom pokemon in der navbar 
 */

/** Optional Aufgaben
 * ID bei kleinen Pokemon Karte
 * Pokemon erscheint anders beim Hover von kleinen Pokemon Karte
 * Footer hinzugefügt
 */

// ----------------------------------------- Anfang ------------------------------------------------------
/** DE
 * Initialisiert verschiedene Funktionen: ...
 */
const init = async () => {
  toggleClass("more-profiles", "d_none");
  toggleClass("loading-spinner-container", "d_none"); 
  await loadingPokeData();
  createCards(dataAllPokemon);  
  toggleClass("loading-spinner-container", "d_none");
  toggleClass("more-profiles", "d_none");
  setCheckStartEnd();
  console.log(dataAllPokemon)
};

const loadingPokeData = async () => {
  for (let i = start; i < end; i++) {
    await fetchDataPokeJson(i + 1);
  }
};

const createCards = (dataArray) => {
  let contentRef = document.getElementById("content-profiles");
  let codePart = "";

  let endValue = dataArray.length < end ? dataArray.length : end;

  for (let i = 0; i < endValue; i++) {
    codePart += renderCard(dataArray[i]);
  }
  contentRef.innerHTML = codePart;
};

const setCheckStartEnd = () => {
  start = end;
  end = end + stepNumber > maxNumber ? maxNumber : end + stepNumber;
  if (start == end) {
    toggleClass("more-profiles", "d_none");
  }
};

const createTypSection = (types) =>
  types.map((e) => renderTypSection(e)).join(" ");

const createTypInfoSection = (types) =>
  types.map((e) => renderTypInfoSection(e)).join(" ");

const getBGType = (types, degree) => {
  let color1 = typeColors[types[0].type.name]
    ? typeColors[types[0].type.name]
    : "white";
  let color2 = "white";
  if (types.length >= 2) {
    color2 = typeColors[types[1].type.name];
  }
  return renderLinearGradient(degree, color1, color2);
};

// ----------------------------------------- Sonstige ------------------------------------------------------


/** DE wechseln der Klasse
 * Schaltet eine Klasse für ein HTML-Element um.
 * @param {string} id - ID des HTML-Elements.
 * @param {string} classname - Name der Klasse, die umgeschaltet werden soll.
 */
/** ENG toggle the class
 * Toggles a class for a HTML element.
 * @param {string} id - ID of the HTML element.
 * @param {string} classname - Name of the class to be switched.
 */
const toggleClass = (id, classname) => {
  let idRef = document.getElementById(id);
  idRef.classList.toggle(classname);
};

const enableOverlay = (index) => {
  let bodyRef = document.getElementById("body-container");
  bodyRef.innerHTML += renderOverlay(index);
  bodyRef.classList.add("overflowHidden");
};

/** DE
 * Entfernt das Overlay-Element.
 * @param {String} id
 */
const closeOverlay = (id) => {
  let bodyRef = document.getElementById("body-container");
  const overlay = document.getElementById(id);
  const parent = overlay.parentNode;

  parent.removeChild(overlay);
  bodyRef.classList.remove("overflowHidden");
};

const eventStop = (event) => {
  event.stopPropagation();
};

// ----------------------------------------- navbar ------------------------------------------------------

const selectNavItem = (id) => {  
  toggleClass("item" + selectedIndex, "selected");
  toggleClass("item" + id, "selected");
  selectedIndex = id;  
};

const createScore = (index) => {
  let contRef = document.getElementById("card-info-content");
  contRef.innerHTML = renderScore(index);
};

const createCardInfoContent = (index) =>{
  switch (selectedIndex) {
    case 0: return renderTest(index); break;
    case 1: return renderScore(index); break;
    case 2: return renderAllStats(index); break;
    case 3: return renderTest(index); break;
    default: return renderTest(404);
  }
}


const createAbilities = (index) => {
  let abiNames = [];
  for (let i = 0; i < dataAllPokemon[index].abilities.length; i++) {
    abiNames.push(dataAllPokemon[index].abilities[i].ability.name);
  }

  return abiNames.join(", ");
};

const nextCard = (index, direction) => {
  console.log(selectedIndex)
  let cardInfoRef = document.getElementById("overlay");
  let futureIndex = direction == "right" ? ++index : --index;

  cardInfoRef.innerHTML = "";

  if (futureIndex >= start) {
    futureIndex = 0;
  }

  if (futureIndex < 0) {
    futureIndex = start - 1;
  } 
  if (searchPhrase.length >= 3) {
    if (dataAllPokemon[futureIndex].name.toLowerCase().includes(searchPhrase)) {
      cardInfoRef.innerHTML = renderCardInfo(futureIndex);
    } else {      
      nextCard(futureIndex, direction);
    }
  } else {
    cardInfoRef.innerHTML = renderCardInfo(futureIndex);
  }
};

const filterPokemon = () => {
  searchPhrase = document.getElementById("searchbar").value;
  if (searchPhrase.length > 2) {
    dataPartPokemon = dataAllPokemon.filter((p) =>
      p.name.includes(searchPhrase.toLowerCase())
    );
    if (dataPartPokemon.length == 0) {
      let contentRef = document.getElementById("content-profiles");
      contentRef.innerHTML = renderNotFound();
    } else {
      createCards(dataPartPokemon);
    }
  } else {
    createCards(dataAllPokemon);
  }
};
