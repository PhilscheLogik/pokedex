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
<img src="./asset/img/icon/typeIcon_${type.type.name}.png" alt="#">
`;

const renderOverlay = (index) => `
<div id="overlay" onclick="closeOverlay('overlay')">
  <section onclick="eventStop(event)" class="card-container">
    <div class="card-header">
      <span>#${dataPokemon[index].id}</span>
      <h3>${
        dataPokemon[index].name.charAt(0).toUpperCase() +
        dataPokemon[index].name.slice(1)
      }</h3>        
    </div>
    <div class="img-type-color" >
      <img src="${
        dataPokemon[index].sprites.other["official-artwork"].front_default
      }" alt="#">
    </div>
    <div class="card-types">
      ${createTypSection(dataPokemon[index].types)}
    </div>
  </section>
</div>
`;

const renderLinearGradient = (color1, color2) =>
  `linear-gradient(120deg, ${color1}, ${color2})`;
