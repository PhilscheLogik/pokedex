"use strict";
/** Anmerkung
 * Hier werden Funktionen gespeichert, die HTML Code rendern bzw. erstellen.
 * Funktion wurden alphabetisch sortiert
 */

// ----------------------------------------- Code ------------------------------------------------------
/** DE Erstellen der abilities
 * Gibt eine durch Kommas getrennte Liste der Fähigkeiten eines Pokémon zurück.
 * @param {number} index - Der Index des Pokémon im Datenarray.
 * @returns {string} - Eine durch Kommas getrennte Liste der Fähigkeiten.
 */
/** ENG Create abilities
 * Returns a comma-separated list of the Pokémon's abilities.
 * @param {number} index - The index of the Pokémon in the data array.
 * @returns {string} - A comma-separated list of abilities.
 */
const createAbilities = (index) => {
  let abiNames = [];
  for (let i = 0; i < dataAllPokemon[index].abilities.length; i++) {
    abiNames.push(dataAllPokemon[index].abilities[i].ability.name);
  }
  return abiNames.join(", ");
};

/** DE Erstellen des Inhalts für die Karteninfo
 * Gibt den spezifischen Inhalt basierend auf dem aktuellen Auswahlindex zurück.
 * @param {number} index - Der Index des Pokémon im Datenarray.
 * @returns {string} - Der gerenderte Inhalt für die Karteninfo.
 */
/** ENG Create card info content
 * Returns specific content based on the current selected index.
 * @param {number} index - The index of the Pokémon in the data array.
 * @returns {string} - The rendered content for the card info.
 */
const createCardInfoContent = (index) =>{
  switch (selectedIndex) {
    case 0: return renderShiny(index);
    case 1: return renderScore(index);
    case 2: return renderAllStats(index);
    case 3: return renderSound(index);
    default: return renderTest(404);
  }
}

/** DE Erstellen von cards
 * Erstellt und rendert cards basierend auf den bereitgestellten Daten.
 * @param {Array} dataArray - Array mit den Daten für die Karten.
 */
/** ENG Create cards
 * Generates and renders cards based on the provided data.
 * @param {Array} dataArray - Array containing data for the cards.
 */
const createCards = (dataArray) => {
  let contentRef = document.getElementById("content-profiles");
  let codePart = "";

  let endValue = dataArray.length < end ? dataArray.length : end;

  for (let i = 0; i < endValue; i++) {
    codePart += renderCard(dataArray[i]);
  }
  contentRef.innerHTML = codePart;
};

/** DE Score erstellen
 * Rendert den Score für das angegebene Pokémon.
 * @param {number} index - Index des Pokémon in den Daten.
 */
/** ENG Create score
 * Renders the score for the specified Pokémon.
 * @param {number} index - Index of the Pokémon in the data.
 */
const createScore = (index) => {
  let contRef = document.getElementById("card-info-content");
  contRef.innerHTML = renderScore(index);
};

/** DE Shiny erstellen
 * Rendert die Shiny Version für das angegebene Pokémon.
 * @param {number} index - Index des Pokémon in den Daten.
 */
/** ENG Create shiny
 * Renders the shiny version for the specified Pokémon.
 * @param {number} index - Index of the Pokémon in the data.
 */
const createShiny = (index) => {
  let contRef = document.getElementById("card-info-content");
  contRef.innerHTML = renderShiny(index);
};

/** DE statistische Werte erstellen
 * Rendert die stats für das angegebene Pokémon.
 * @param {number} index - Index des Pokémon in den Daten.
 */
/** ENG Create stats
 * Renders stats for the specified Pokémon.
 * @param {number} index - Index of the Pokémon in the data.
 */
const createStats = (index) => {
  let contRef = document.getElementById("card-info-content");
  contRef.innerHTML = renderAllStats(index);
};

/** DE Sound erstellen
 * Rendert den Sound für das angegebene Pokémon.
 * @param {number} index - Index des Pokémon in den Daten.
 */
/** ENG Create sound
 * Renders the sound for the specified Pokémon.
 * @param {number} index - Index of the Pokémon in the data.
 */
const createSound = (index) => {
  let contRef = document.getElementById("card-info-content");
  contRef.innerHTML = renderSound(index);
};

/** DE Typ erstellen für kleine cards
 * Erstellt HTML für die Typen eines Pokémon.
 * @param {Array} types - Array der Typobjekte des Pokémon.
 * @returns {string} - Zusammengesetztes HTML der Typen.
 */
/** ENG Create type for little cards
 * Generates HTML for a Pokémon's types.
 * @param {Array} types - Array of the Pokémon's type objects.
 * @returns {string} - Combined HTML of the types.
 */
const createTypSection = (types) => types.map((e) => renderTypSection(e)).join(" ");

/** DE Typ erstellen für große cards
 * Erstellt HTML für die Typen eines Pokémon.
 * @param {Array} types - Array der Typobjekte des Pokémon.
 * @returns {string} - Zusammengesetztes HTML der Typen.
 */
/** ENG Create type for big cards
 * Generates HTML for a Pokémon's types.
 * @param {Array} types - Array of the Pokémon's type objects.
 * @returns {string} - Combined HTML of the types.
 */
const createTypInfoSection = (types) => types.map((e) => renderTypInfoSection(e)).join(" ");

// ----------------------------------------- Render ------------------------------------------------------
const renderAllStats = (index) => {
  let codePart = "";
  for (let i = 0; i < dataAllPokemon[index].stats.length; i++) {
    codePart += renderStat(index, i);
  }
  return codePart;
};

const renderCard = (data) => `
<section onclick="enableOverlay(${data.id - 1})" 
class="card" style="background: ${getBGType(data.types, 90)};">
  <section class="content">
    <section class="top">
      <p>#${data.id}</p>
      <p>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>      
    </section>
    <section class="middle" 
    style="background: ${getBGType(data.types, 120)};">      
      <img src="${data.sprites.other["official-artwork"].front_default}"
      alt="pokemon${data.id}" />
    </section>
    <section class="bottom">
      ${createTypSection(data.types)}
    </section>
  </section>
</section>
`;

const renderCardInfo = (index) => `
  <section onclick="eventStop(event)" class="card-info-container">
    <div onclick="nextCard(${index}, 'left')" class="arrow left-arrow"><</div>
    <div onclick="nextCard(${index}, 'right')" class="arrow right-arrow">></div>
    <div class="card-info-header">
      <span>#${dataAllPokemon[index].id}</span>
      <h3>${
        dataAllPokemon[index].name.charAt(0).toUpperCase() +
        dataAllPokemon[index].name.slice(1)
      }</h3>        
    </div>
    <div class="card-info-types">
      ${createTypInfoSection(dataAllPokemon[index].types)}          
    </div>
    <div class="card-info-img-type-color" 
    style="background: ${getBGType(
      dataAllPokemon[index].types,
      225
    )};">          
      <img 
      src="${
        dataAllPokemon[index].sprites.other["official-artwork"].front_default
      }" 
      alt="pokemon${dataAllPokemon[index].id}"/>
    </div>
    <section class="card-info-nav" >          
      <nav>
        <ul id="nav-list">
          <li onclick="createShiny(${index}), selectNavItem(0)" 
           id="item0" class="${selectedIndex === 0 ? "selected" : ""}">Shiny</li>
          <li onclick="createScore(${index}), selectNavItem(1)"
           id="item1" class="${selectedIndex === 1 ? "selected" : ""}">Scores</li>
          <li onclick="createStats(${index}), selectNavItem(2)"
           id="item2" class="${selectedIndex === 2 ? "selected" : ""}">Stats</li>
          <li onclick="createSound(${index}), selectNavItem(3)" 
           id="item3" class="${selectedIndex === 3 ? "selected" : ""}">
           Sound</li>
        </ul>
      </nav>
      <div id="card-info-content">${createCardInfoContent(index)}</div>
    </section>        
  </section>
`;

const renderLinearGradient = (degree, color1, color2) => `linear-gradient(${degree}deg, ${color1}, ${color2})`;

const renderNotFound = () => `
<h2>Unfortunately nothing could be found :( <br>
Please enter something else.<h2>
`;

const renderOverlay = (index) => `
<div id="overlay" onclick="closeOverlay('overlay')">
  ${renderCardInfo(index)}  
</div>
`;

const renderScore = (index) => `
<table>
  <tr>
    <td><i>Abilities</i></td>
    <td>:</td>
    <td>${createAbilities(index)}</td>
  </tr>
  <tr>
    <td><i>Species</i></td>
    <td>:</td>
    <td>${dataAllPokemon[index].species.name}</td>
  </tr>
  <tr>
    <td><i>Height</i></td>
    <td>:</td>
    <td>${dataAllPokemon[index].height * 10} cm</td>
  </tr>
  <tr>
    <td><i>Weight</i></td>
    <td>:</td>
    <td>${(dataAllPokemon[index].weight / 10)
      .toFixed(2)
      .replace(".", ",")} kg</td>
  </tr>
</table>
`;

const renderShiny = (index) => `
<div class="shiny-container">          
  <img 
  src="${dataAllPokemon[index].sprites.other["official-artwork"].front_shiny}" 
  alt="pokemon${dataAllPokemon[index].id}"/>
</div>
`;

const renderSound = (index) => `
<div class="audio-container"
  <div id="sound-control">
    <img 
      src="./asset/img/icon/play_circle.png" 
      alt="Play Sound" 
      onclick="playSound(
      '${String(dataAllPokemon[index].cries.latest)}', 'volume-control')"
    />
    <input 
      id="volume-control" 
      type="range" 
      min="0" 
      max="1" 
      step="0.01" 
      value="${soundValue}" 
      style="width: 150px;" 
      oninput="setVolume(this.value, 'audio-player')"
    />
  </div>

  <audio id="audio-player" src="" preload="auto"></audio>
</div>
`;

const renderStat = (index, i) => `
<div class="bar-with-label">
  <span class="label">${dataAllPokemon[index].stats[i].stat.name} :</span>
  <div class="dia-bar" style="--dia: ${Math.round(
    (dataAllPokemon[index].stats[i].base_stat / 255) * 100
  ).toFixed(0)}%;">
    ${dataAllPokemon[index].stats[i].base_stat}
  </div> 
</div>
`;

const renderTest = (index) => `<p>TEST ${index}<p>`;

const renderTypInfoSection = (type) => `
<span><img src="./asset/img/icon/typeIcon_${type.type.name}.png" alt="${
  type.type.name
}"> ${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>
`;

const renderTypSection = (type) => `
<img src="./asset/img/icon/typeIcon_${type.type.name}.png" alt="${type.type.name}">
`;