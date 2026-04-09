import React, { useRef, useState } from "react";
import { useAnimations } from "../hooks/useAnimations";
import FilterAnimations from "../components/FilterAnimations";
import ListAnimationElementComplex from "../components/AnimationElements/ListAnimationElementComplex";
import CopyPopover from "../components/CopyPopover";
import styles from "@/styles/popup-page.module.css";
import Popup from "../components/Popup";

export default function Popups() {
  const popupTarget = useRef();
  const {
    filteredList,
    selectedCategory,
    setSelectedType,
    selectedType,
    availableTypes,
  } = useAnimations({
    initialCategory: "popup",
  });
  const [selectedAnim, setSelectedAnim] = useState(null);

  return (
    <main id={`${styles["main-popup"]}`}>
      <h2>Animaciones para tus popups</h2>
      <div className="muestra-popup">
        <Popup popupTarget={popupTarget} />
      </div>
      <FilterAnimations
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        availableTypes={availableTypes}
      />

      <section className="animations-container">
        <ListAnimationElementComplex
          target={popupTarget}
          filteredList={filteredList}
          setSelectedAnim={setSelectedAnim}
        />
      </section>
      <CopyPopover anim={selectedAnim} category={selectedCategory} />
    </main>
  );
}
