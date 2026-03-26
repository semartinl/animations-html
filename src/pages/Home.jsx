import React from "react";

export default function Home() {
  return (
    <main>
      <h1>Elements animations</h1>
      <h3>Nice collection of CSS animations for your awesome web projects</h3>

      <section className="animations-container">
        <h3>Shadow</h3>
        <div className="animations-list">
          <div className="animation-element">
            <span className="title">shadow-drop-center</span>
            <input type="number" name="time-animation" id="time-animation" />

            <div className="buttons-animations">
              <button id="copy">Copiar</button>
              <button id="play">Play</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
