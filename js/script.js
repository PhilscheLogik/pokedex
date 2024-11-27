"use strict";

/** Allgemeine Info
 *  
 */
// ----------------------------------------- Anfang ------------------------------------------------------
/** DE
 * Initialisiert verschiedene Funktionen: ...
 */
const init = () => {
  // getLocalStorage();
  fetchDataGOTJson();
};

const createCards = () => {
  let contentRef = document.getElementById("content-profiles");
  let codePart = start === 0 ? "" : contentRef.innerHTML;

  for (let i = start; i < end; i++) {
    codePart += renderProfile(dataArray[i]);
  }
  contentRef.innerHTML = codePart;
  setCheckStartEnd();
};

const setCheckStartEnd = () => {
  console.log("--------------");
  console.log(start, end);
  start = end;
  end = end + 5 > dataArray.length ? dataArray.length : end + 5;

  console.log(dataArray);

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

