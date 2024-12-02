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
  ${renderCardInfo(index)}  
</div>
`;

const renderCardInfo = (index) => `
  <section onclick="eventStop(event)" class="card-info-container">
    <div onclick="nextCard(${index}, 'left')" class="arrow left-arrow"><</div>
    <div onclick="nextCard(${index}, 'right')" class="arrow right-arrow">></div>
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
        <ul id="nav-list">
          <li class="selected" onclick="createMeasures(${index}), selectNavItem(0)" id="item0">About</li>
          <li onclick="createTest(1), selectNavItem(1)" id="item1">Stats</li>
          <li onclick="createTest(2), selectNavItem(2)" id="item2">Evolution</li>
        </ul>
      </nav>
      <div id="card-info-content">${renderMeasures(index)}</div>
    </section>        
  </section>
`;

const renderLinearGradient = (color1, color2) =>
  `linear-gradient(120deg, ${color1}, ${color2})`;

const renderTest = (index) => `<p>TEST ${index}<p>`;

const createTest = (index) => {
  let contRef = document.getElementById("card-info-content");
  contRef.innerHTML = renderTest(index);
};

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
    <td>${(dataPokemon[index].weight / 10).toFixed(2).replace(".", ",")} kg</td>
  </tr>
</table>
`;
