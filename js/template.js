"use strict";
/**
 * Hier werden Funktionen gespeichert, die HTML Code rendern bzw. erstellen.
 */

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

const renderTypSection = (type) => `
<img src="./asset/img/icon/typeIcon_${type.type.name}.png" alt="${type.type.name}">
`;

const renderTypInfoSection = (type) => `
<span><img src="./asset/img/icon/typeIcon_${type.type.name}.png" alt="${
  type.type.name
}"> ${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>
`;

const renderOverlay = (index) => `
<div id="overlay" onclick="closeOverlay('overlay')">
  ${renderCardInfo(index)}  
</div>
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

const createSound = (index) => {
  let contRef = document.getElementById("card-info-content");
  contRef.innerHTML = renderSound(index);
};

const renderSound = (index) => `
<div class="audio-container"
  <div id="sound-control">
    <img 
      src="./asset/img/icon/play_circle.png" 
      alt="Play Sound" 
      onclick="playSound('${String(
        dataAllPokemon[index].cries.legacy
      )}', 'volume-control')"
    />
    <input 
      id="volume-control" 
      type="range" 
      min="0" 
      max="1" 
      step="0.01" 
      value="0.4" 
      style="width: 150px;" 
      oninput="setVolume(this.value, 'audio-player')"
    />
  </div>

  <audio id="audio-player" src="" preload="auto"></audio>
</div>
`;

const playSound = (soundUrl, volumeID) => {
  const audioPlayer = document.getElementById("audio-player");
  const volume = document.getElementById(volumeID);

  audioPlayer.src = soundUrl;
  audioPlayer.type = "audio/ogg";
  audioPlayer.volume = volume.value;

  audioPlayer.play();
};

const setVolume = (volume, audioPlayerId) => {
  const audioPlayer = document.getElementById(audioPlayerId);
  audioPlayer.volume = volume;
};

const createShiny = (index) => {
  let contRef = document.getElementById("card-info-content");
  contRef.innerHTML = renderShiny(index);
};

const renderShiny = (index) => `
<div class="shiny-container">          
  <img 
  src="${dataAllPokemon[index].sprites.other["official-artwork"].front_shiny}" 
  alt="pokemon${dataAllPokemon[index].id}"/>
</div>
`;
const renderLinearGradient = (degree, color1, color2) =>
  `linear-gradient(${degree}deg, ${color1}, ${color2})`;

const renderTest = (index) => `<p>TEST ${index}<p>`;

const createStats = (index) => {
  let contRef = document.getElementById("card-info-content");
  contRef.innerHTML = renderAllStats(index);
};

const renderAllStats = (index) => {
  let codePart = "";
  for (let i = 0; i < dataAllPokemon[index].stats.length; i++) {
    codePart += renderStat(index, i);
  }
  return codePart;
};

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

const renderNotFound = () => `
<h2>Unfortunately nothing could be found :( <br>
Please enter something else.<h2>
`;
