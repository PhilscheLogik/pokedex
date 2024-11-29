"use strict";

/** Allgemeine Info
 *
 */
// ----------------------------------------- Anfang ------------------------------------------------------
/** DE
 * Initialisiert verschiedene Funktionen: ...
 */
const init = async () => {
  await loadingPokeData();
};

// const loadingPokeData = () => {
//   for (let i = start; i < end; i++) {
//     fetchDataPokeJson(i + 1);
//   }
//   console.log(dataPokemon);
//   console.log(dataPokemon[0])
// };

const loadingPokeData = async () => {
  const promises = [];
  for (let i = start; i < end; i++) {
    promises.push(await fetchDataPokeJson(i + 1));
  }
  await Promise.all(promises);

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
