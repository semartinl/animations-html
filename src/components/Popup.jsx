import React from "react";
import styles from "@/styles/popup-page.module.css";

export default function Popup({ popupTarget }) {
  return (
    <>
      <button className="popup-button" popoverTarget={`${styles.popup}`}>
        Eliminar cuenta
      </button>
      <section
        id={`${styles.popup}`}
        className="popup-container"
        ref={popupTarget}
        popover="manual"
      >
        <h4>¿Seguro que deseas eliminar la cuenta?</h4>
        <button id={styles.cancel} popoverTarget={`${styles.popup}`}>
          Cancelar
        </button>
        <button id={styles.delete}>Eliminar</button>
      </section>
    </>
  );
}
