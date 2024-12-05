"use strict";

/** DE Optionale Aufgaben erledigt
 * ID bei kleinen Pokemon cards
 * Hover Effekt von den kleinen Pokemon cards
 * Footer hinzugefügt -> mit Links zu den Quellen
 * Hintergrundfarbe beim Pokemonbild hat einen Verlauf
 * Shiny Bilder werden in der nav ausgegeben
 * Abilities, Species, Height, Weight werden in der nav ausgegeben
 * Stats des Pokemons werden grafisch in der nav dargestellt 
 * Schrei des einzelnen Pokemons kann mit Lautstärkeregler in der nav abgespielt werden
 * Auswahl in der nav Leiste wird gespeichert
 * beim Filter wird das Durchlaufen der Gallery berücksichtigt
 */

/** DE Anmerkung
 * Funktionen sind nach Aufruf bzw. nach Kategorie sortiert
 * BUG: Neigung der kleinen Cards ist bei Google Chrome und Edge leicht unscharf -> liegt an der Engine nach jetztigen Kenntnisstand
 * Projekt wurde ohne Bootstrap bewerkstelligt, weil Herausforderung bezüglich der Umsetzung des Designs
 * es wurde sich an folgende Layouts orientiert -> https://codepen.io/mikemang/pen/GRrBRZM https://codepen.io/MEDALI1977/pen/VwaREaV
  
 * Erkenntnisse für die Weiterentwicklung:
 * es gibt bei der navbar mit der ID #card-info-content oft die Create Funktionen, die man allgemein schreiben könnte
 * Dateneinlesung mittels https://pokeapi.co/api/v2/pokemon?offset=0&limit=50 -> das 'results' enthält die url, die man auslesen könnte, um das max zu ermitteln
 * Shiny Bild wechselt sich durch das hovern des Standbildes statt ein Reiter/tab in der nav bar
 * die Weiterentwicklungslinie des Pokemons hinzufügen, falls vorhanden
 * -> Funktion bei der Weiterentwicklung z.B. man wählt Bisasam aus, sieht den Entwicklungspfad und kann Bisaflor drücken und wird zu der InfoCard weitergeleitet
 */

// ----------------------------------------- Code ------------------------------------------------------
/** DE Initialisieren
 * Führt initiale Schritte der Anwendung aus:
 * zeigt/verbirgt UI-Elemente, lädt Daten und verarbeitet sie.
 */
/** ENG Initialization
 * Executes initial steps of the application:
 * toggles UI elements, fetches and processes data.
 */
const init = async () => {  
  toggleClass("more-profiles", "d_none");
  toggleClass("loading-spinner-container", "d_none");   
  await fetchResultPokeJson();   
  toggleClass("loading-spinner-container", "d_none");
  toggleClass("more-profiles", "d_none");  
  await loading();
};

/** DE Lade Pokemon Daten
 * zeigt/verbirgt UI-Elemente, lädt Pokémon-Daten, erstellt Karten und aktualisiert UI-Elemente.
 */
/** ENG Loading Pokemon data
 * toggles UI elements, loads Pokémon data, creates cards, and updates UI elements.
 */
const loading = async () => {
  searchPhrase = "";
  toggleClass("more-profiles", "d_none");
  toggleClass("loading-spinner-container", "d_none");   
  await loadingPokeData();
  createCards(dataAllPokemon);  
  toggleClass("loading-spinner-container", "d_none");
  toggleClass("more-profiles", "d_none");
  setCheckStartEnd(); 
};

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

/** DE Laden von Pokémon-Daten
 * Ruft asynchron Daten für eine festgelegte Anzahl von Pokémon ab.
 * @async
 */
/** ENG Load Pokémon data
 * Asynchronously fetches data for a defined range of Pokémon.
 * @async
 */
const loadingPokeData = async () => {
  for (let i = start; i < end; i++) {
    await fetchDataPokeJson(i);
  }
};

/** DE Aktualisierung von Start- und Endwerten
 * Passt die Variablen `start` und `end` an, um Daten in Intervallen zu verarbeiten.
 * Blendet ein Element mit der ID "more-profiles" aus, falls keine weiteren Daten vorhanden sind.
 */
/** ENG Update start and end values
 * Adjusts the `start` and `end` variables to process data in steps.
 * Hides an element with the ID "more-profiles" if no additional data is available.
 */
const setCheckStartEnd = () => {
  start = end;
  end = end + stepNumber > maxNumber ? maxNumber : end + stepNumber;
  if (start == end) {
    toggleClass("more-profiles", "d_none");
  }
};

/** DE Hintergrundfarbe für Typen generieren
 * Gibt einen Farbverlauf basierend auf den Typen eines Objekts zurück.
 * @param {Array} types - Array von Typen mit einem `type.name`-Attribut.
 * @param {number} degree - Der Winkel für den Farbverlauf in Grad.
 * @returns {string} Ein CSS-Farbverlauf als String.
 */
/** ENG Generate background color for types
 * Returns a gradient based on the types of an object.
 * @param {Array} types - Array of types with a `type.name` attribute.
 * @param {number} degree - The angle for the gradient in degrees.
 * @returns {string} A CSS gradient as a string.
 */
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

// ----------------------------------------- Overlay ------------------------------------------------------
/** DE Overlay aktivieren
 * Fügt ein Overlay für die Seite hinzu und verhindert das Scrollen des Inhalts.
 * @param {number} index - Index, der genutzt wird, um das Overlay-Inhalt zu generieren.
 */
/** ENG Enable overlay
 * Adds an overlay to the page and prevents content scrolling.
 * @param {number} index - Index used to generate the overlay content.
 */
const enableOverlay = (index) => {
  let bodyRef = document.getElementById("body-container");
  bodyRef.innerHTML += renderOverlay(index);
  bodyRef.classList.add("overflowHidden");
};

/** DE Overlay schließen
 * Entfernt ein Overlay von der Seite und erlaubt wieder das Scrollen des Inhalts.
 * @param {string} id - ID des HTML-Elements, das als Overlay entfernt werden soll.
 */
/** ENG Close overlay
 * Removes an overlay from the page and re-enables content scrolling.
 * @param {string} id - ID of the HTML element to be removed as overlay.
 */
const closeOverlay = (id) => {
  let bodyRef = document.getElementById("body-container");
  const overlay = document.getElementById(id);
  const parent = overlay.parentNode;

  parent.removeChild(overlay);
  bodyRef.classList.remove("overflowHidden");
};

/** DE Ereignisausbreitung stoppen
 * Verhindert die Weiterleitung eines Ereignisses zu übergeordneten Elementen.
 * @param {Event} event - Das Ereignis, dessen Weiterleitung gestoppt werden soll.
 */
/** ENG Stop event propagation
 * Prevents the event from propagating to parent elements.
 * @param {Event} event - The event to stop from propagating.
 */
const eventStop = (event) => {
  event.stopPropagation();
};

/** DE Sound abspielen
 * Spielt einen Sound mit der angegebenen URL und einer einstellbaren Lautstärke ab.
 * @param {string} soundUrl - URL der Audiodatei, die abgespielt werden soll.
 * @param {string} volumeID - ID des HTML-Elements (z. B. ein Slider), das die Lautstärke steuert.
 */
/** ENG Play sound
 * Plays a sound from the given URL with adjustable volume.
 * @param {string} soundUrl - URL of the audio file to be played.
 * @param {string} volumeID - ID of the HTML element (e.g., a slider) controlling the volume.
 */
const playSound = (soundUrl, volumeID) => {
  const audioPlayer = document.getElementById("audio-player");
  const volume = document.getElementById(volumeID);

  audioPlayer.src = soundUrl;
  audioPlayer.type = "audio/ogg";
  audioPlayer.volume = volume.value;

  audioPlayer.play();
};

/** DE Lautstärke einstellen
 * Passt die Lautstärke eines Audio-Players an.
 * @param {number} volume - Neue Lautstärke, als Dezimalwert zwischen 0 und 1 (z. B. 0.5 für 50%).
 * @param {string} audioPlayerId - ID des HTML-Audio-Elements, dessen Lautstärke angepasst werden soll.
 */
/** ENG Set volume
 * Adjusts the volume of an audio player.
 * @param {number} volume - New volume as a decimal between 0 and 1 (e.g., 0.5 for 50%).
 * @param {string} audioPlayerId - ID of the HTML audio element to adjust the volume for.
 */
const setVolume = (volume, audioPlayerId) => {
  const audioPlayer = document.getElementById(audioPlayerId);
  audioPlayer.volume = volume;
  soundValue = volume;
};

// ----------------------------------------- navbar ------------------------------------------------------
/** DE Auswahl des Navigationspunkts
 * Schaltet die "selected"-Klasse zwischen dem aktuellen und dem ausgewählten Navigationseintrag um.
 * @param {number} id - Die ID des Navigationseintrags, der ausgewählt werden soll.
 */
/** ENG Select the navigation item
 * Toggles the "selected" class between the current and the newly selected navigation item.
 * @param {number} id - The ID of the navigation item to be selected.
 */
const selectNavItem = (id) => {  
  toggleClass("item" + selectedIndex, "selected");
  toggleClass("item" + id, "selected");
  selectedIndex = id;  
};

/** DE Nächste Karte
 * Aktualisiert die angezeigte Karte basierend auf dem aktuellen Index und der Richtung.
 * @param {number} index - Der aktuelle Index der angezeigten Karte.
 * @param {string} direction - Die Richtung der Navigation ("right" oder "left").
 */
/** ENG Next card
 * Updates the displayed card based on the current index and direction.
 * @param {number} index - The current index of the displayed card.
 * @param {string} direction - The direction of navigation ("right" or "left").
 */
const nextCard = (index, direction) => {  
  let cardInfoRef = document.getElementById("overlay");
  let futureIndex = direction == "right" ? ++index : --index;

  cardInfoRef.innerHTML = "";
  if (futureIndex >= start) futureIndex = 0;
  if (futureIndex < 0) futureIndex = start - 1;

  filterBasedSearch(futureIndex, cardInfoRef, direction);
};

/** DE Filter basierend auf der Suche
 * Zeigt die card basierend auf dem Suchbegriff an oder geht zur nächsten card.
 * @param {number} futureIndex - Der zukünftige Index der card.
 * @param {object} cardInfoRef - Referenz des Elements für die Kartenanzeige.
 * @param {string} direction - Die Richtung der Navigation ("right" oder "left").
 */
/** ENG Filter based on search
 * Displays the card based on the search term or goes to the next card.
 * @param {number} futureIndex - The future index of the card.
 * @param {object} cardInfoRef - Reference of the element displaying the card.
 * @param {string} direction - The direction of navigation ("right" or "left").
 */
const filterBasedSearch = (futureIndex, cardInfoRef, direction) => {
  if (searchPhrase.length >= 3) {
    if (dataAllPokemon[futureIndex].name.toLowerCase().includes(searchPhrase)) {
      cardInfoRef.innerHTML = renderCardInfo(futureIndex);
    } else {      
      nextCard(futureIndex, direction);
    }
  } else {
    cardInfoRef.innerHTML = renderCardInfo(futureIndex);
  }
}

// ----------------------------------------- Filter ------------------------------------------------------
/** DE Pokémon filtern
 * Filtert die Liste der Pokémon basierend auf der Eingabe im Suchfeld und zeigt das Ergebnis an.
 * Wenn keine Übereinstimmungen gefunden werden, wird eine "Nicht gefunden"-Nachricht angezeigt.
 * @param {void} 
 */
/** ENG Filter Pokémon
 * Filters the Pokémon list based on the input in the search bar and displays the results.
 * If no matches are found, a "Not Found" message is displayed.
 * @param {void}
 */
const filterPokemon = () => {
  searchPhrase = document.getElementById("searchbar").value;
  if (searchPhrase.length > 2) {
    dataPartPokemon = dataAllPokemon.filter((p) =>p.name.includes(searchPhrase.toLowerCase()));
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