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

const loadingPokeData = async () => {
  const promises = [];
  for (let i = start; i < end; i++) {
    promises.push(fetchDataPokeJson(i + 1)); //new vorher stand fetchDataPokeJson
  }
  await Promise.all(promises); //new
  
  createCards(); 
  // console.log(dataPokemon[0])
  // console.log(dataPokemon[0].sprites.other["official-artwork"].front_default)
  
}


const createCards = () => {
  let contentRef = document.getElementById("content-profiles");
  let codePart = start === 0 ? "" : contentRef.innerHTML;

  for (let i = start; i < end; i++) {
    codePart += renderProfile(dataPokemon[i]);
  }
  contentRef.innerHTML = codePart;  
};

const setCheckStartEnd = () => { 
  start = end;
  end = end + 5 > dataPokemon.length ? dataPokemon.length : end + 5;
  if (start == end) {
    buttonDisabled();
  }  
};

const buttonDisabled = () => {
  let btnRef = document.getElementById("more-profiles");
  btnRef.classList.add("d_none");
};










// -------------- Zeug --------------------
/** DE
 * Entfernt das Overlay-Element.
 * @param {String} id 
 */
const closeOverlay = (id) => {
  const overlay = document.getElementById(id); // Hole das übergeordnete Element
  const parent = overlay.parentNode;
  parent.removeChild(overlay); // Entferne das Div vom übergeordneten Element
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

