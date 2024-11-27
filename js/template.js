"use strict";
/**
 * Hier werden Funktionen gespeichert, die HTML Code rendern.
 */
// ----------------------------------------- Warenkorb ------------------------------------------------------

const renderProfile = (data) => `
<section class="card">
  <div>
    <span>ID</span>
    <h3>POKENAME</h3>        
  </div>
  <img src="#" alt="#">
  <div>
    <img src="#" alt="#">
    <img src="#" alt="#">
  </div>
</section>
`;

const renderError = (error) => `
<section>
  <div>
    <h2>Error</h2>
    <p>Fehler beim Abrufen der Daten!
    <i><b>${error}<b/></i></p>
  </div>
</section>
`;