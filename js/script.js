"use strict";

/** Allgemeine Info
 *
 * 3 Spinner Loading
 * 4 Filter function
 * check 1 -> 1 Navbar
 * 5 Responsiv
 * check 2 -> 2 Overlay Bilder links rechts
 * 6 mehr navbar content wie Evo Level
 * 7 sound vom pokemon
 */

// ----------------------------------------- Anfang ------------------------------------------------------
/** DE
 * Initialisiert verschiedene Funktionen: ...
 */
const init = async () => {
  await loadingPokeData();
};

const loadingPokeData = async () => {
  for (let i = start; i < end; i++) {
    await fetchDataPokeJson(i + 1);
  }
  createCards();
  setCheckStartEnd();
};

const createCards = () => {
  let contentRef = document.getElementById("content-profiles");
  let codePart = start === 0 ? "" : contentRef.innerHTML;

  for (let i = start; i < end; i++) {
    codePart += renderCard(dataPokemon[i]);
  }
  contentRef.innerHTML = codePart;
};

const setCheckStartEnd = () => {
  start = end;
  end = end + stepNumber > maxNumber ? maxNumber : end + stepNumber;
  if (start == end) {
    buttonDisabled();
  }
};

const buttonDisabled = () => {
  let btnRef = document.getElementById("more-profiles");
  btnRef.classList.add("d_none");
};

const createTypSection = (types) =>
  types.map((e) => renderTypSection(e)).join(" ");

const createTypInfoSection = (types) =>
  types.map((e) => renderTypInfoSection(e)).join(" ");

const getBGType = (types) => {
  let color1 = typeColors[types[0].type.name]
    ? typeColors[types[0].type.name]
    : "white";
  let color2 = "white";
  if (types.length >= 2) {
    color2 = typeColors[types[1].type.name];
  }
  return renderLinearGradient(color1, color2);
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

const createMeasures = (index) => {
  let contRef = document.getElementById("card-info-content");
  contRef.innerHTML = renderMeasures(index);
};

const createAbilities = (index) => {
  let abiNames = [];
  for (let i = 0; i < dataPokemon[index].abilities.length; i++) {
    abiNames.push(dataPokemon[index].abilities[i].ability.name);
  }

  return abiNames.join(", ");
};

const nextCard = (index, direction) => {
  let cardInfoRef = document.getElementById("overlay");
  let futureIndex = direction == "right" ? ++index : --index;

  if (futureIndex >= start) {
    futureIndex = 0;
  }

  if (futureIndex < 0) {
    futureIndex = start - 1;
  } 

  cardInfoRef.innerHTML = "";
  cardInfoRef.innerHTML = renderCardInfo(futureIndex);
};
