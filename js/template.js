"use strict";
/**
 * Hier werden Funktionen gespeichert, die HTML Code rendern.
 */
// ----------------------------------------- Warenkorb ------------------------------------------------------

const renderProfile = (data) => `
<section class="card-container">
  <div class="card-header">
    <span>#${data.id}</span>
    <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>        
  </div>
  <div class="typ-color">
    <img src="${data.sprites.other["official-artwork"].front_default}" alt="#">
  <div>
  <div class="card-typs">
    <img src="#" alt="#">
    <img src="#" alt="#">
  </div>
</section>
`;

// const renderError = (error) => `
// <section>
//   <div>
//     <h2>Error</h2>
//     <p>Fehler beim Abrufen der Daten!
//     <i><b>${error}<b/></i></p>
//   </div>
// </section>
// `;