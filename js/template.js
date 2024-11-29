"use strict";
/**
 * Hier werden Funktionen gespeichert, die HTML Code rendern.
 */
// ----------------------------------------- Warenkorb ------------------------------------------------------

const renderCard = (data) => `
<section onclick="enableOverlay(${data.id - 1})" class="card-container">
  <div class="card-header">
    <span>#${data.id}</span>
    <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>        
  </div>
  <div style="background: ${getBGType(data.types)};">
    <img src="${data.sprites.other["official-artwork"].front_default}" alt="#">
  </div>
  <div class="card-types">
    ${createTypSection(data.types)}
  </div>
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
  <section onclick="eventStop(event)" class="card-info-container">
    <div class="card-info-header">
      <span>#${dataPokemon[index].id}</span>
      <h3>${
        dataPokemon[index].name.charAt(0).toUpperCase() +
        dataPokemon[index].name.slice(1)
      }</h3>        
    </div>
    <div class="card-info-types">
      ${createTypInfoSection(dataPokemon[index].types)}          
    </div>
    <div class="card-info-img-type-color" style="background: ${getBGType(
      dataPokemon[index].types
    )};">          
      <img src="${
        dataPokemon[index].sprites.other["official-artwork"].front_default
      }" alt="#">
    </div>
    <section class="card-info-nav" >          
      <nav>
        <ul onload="createMeasures(${index})">
          <li class="selected-nav" onclick="createMeasures(${index}), changeListItems('measuresPoke')" id="measuresPoke">Measures</li>
          <li onclick="createMeasures(${index}), changeListItems('test1')" id="test1">TESTNAV</li>
          <li onclick="" id="test2">TESTNAV</li>
        </ul>
      </nav>
      <div id="card-info-content"> 
      INHALT
      </div>
    </section>        
  </section>
</div>
`;

const renderLinearGradient = (color1, color2) =>
  `linear-gradient(120deg, ${color1}, ${color2})`;

const renderMeasures = (index) => `
<table>
  <tr>
    <td>Abilities</td>
    <td>:</td>
    <td>${createAbilities(index)}</td>
  </tr>
  <tr>
    <td>Species</td>
    <td>:</td>
    <td>${dataPokemon[index].species.name}</td>
  </tr>
  <tr>
    <td>Height</td>
    <td>:</td>
    <td>${dataPokemon[index].height * 10} cm</td>
  </tr>
  <tr>
    <td>Weight</td>
    <td>:</td>
    <td>${(dataPokemon[index].weight / 10).toFixed(2).replace(".", ",") } kg</td>
  </tr>
</table>
`;
