"use strict";

/** Allgemeine Info
 *
 * check 1 -> 1 Navbar
 * check 2 -> 2 Overlay Bilder links rechts
 * check 3 -> 3 Spinner Loading
 * check 4 -> 4 Filter function
 * check 5 -> 5 Responsiv must have status
 * check 6 -> 6 cards Layout abändern -> https://codepen.io/mikemang/pen/GRrBRZM https://codepen.io/MEDALI1977/pen/VwaREaV
 * check 7a -> 7a card info Layout abändern -> https://codepen.io/genarocolusso/pen/PoGzXwa
 * check 7b -> 7b card info mit Mausrad und Pfeiltasten vor und zurück gehen
 * check 8a -> 8a BUG: nach filter wird Gallery nicht korrekt durchgeführt
 * 8b BUG: Reiter About wird immer durch die Klasse selected ausgewählt wurde, auch wenn die Gallery weiter geht
 * 8c beim laden favicon animieren
 * 9 neue Dateneinlesung mit dem https://pokeapi.co/api/v2/pokemon?offset=0&limit=50 results
 * 10 Stats in der navbar
 * 12 sound vom pokemon in der navbar
 * 11 Evo in der navbar
 */

/** Optional
 * ID bei kleinen Pokemon Karte
 * Pokemon erscheint größer etc. (optional) beim Hover von kleinen Pokemon Karte
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
/** DE
 * Schaltet eine Klasse für ein HTML-Element um.
 * @param {string} id - Die ID des HTML-Elements.
 * @param {string} classname - Der Name der Klasse, die umgeschaltet werden soll.
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
  const overlay = document.getElementById(id);
  const parent = overlay.parentNode;
  parent.removeChild(overlay);

  let bodyRef = document.getElementById("body-container");
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

const selectLoad = (id) => {
  if(selectedIndex == id) {
    toggleClass("item" + selectedIndex, "selected");
  }
};

const createScore = (index) => {
  let contRef = document.getElementById("card-info-content");
  contRef.innerHTML = renderScore(index);
};

const selectInfoContent = (index) => {

}

const createAbilities = (index) => {
  let abiNames = [];
  for (let i = 0; i < dataAllPokemon[index].abilities.length; i++) {
    abiNames.push(dataAllPokemon[index].abilities[i].ability.name);
  }

  return abiNames.join(", ");
};

const nextCard = (index, direction) => {
  let cardInfoRef = document.getElementById("overlay");
  let futureIndex = direction == "right" ? ++index : --index;

  cardInfoRef.innerHTML = "";

  if (futureIndex >= start) {
    futureIndex = 0;
  }

  if (futureIndex < 0) {
    futureIndex = start - 1;
  }

  console.log(searchPhrase);
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
