import React, { useRef, useState } from "react";
import "@/styles/dropdowns.css";
import { useAnimations } from "../hooks/useAnimations";
import CopyPopover from "../components/CopyPopover";
import Dropdown from "../components/Dropdown";
import FilterAnimations from "../components/FilterAnimations";
import ListAnimationElementComplex from "../components/AnimationElements/ListAnimationElementComplex";
import { Helmet } from "react-helmet";
export default function Dropdowns() {
  const dropdownTarget = useRef();
  const {
    filteredList,
    setSelectedType,
    selectedCategory,
    selectedType,
    availableTypes,
  } = useAnimations({
    initialCategory: "dropdown",
  });
  const [selectedAnim, setSelectedAnim] = useState(null);
  return (
    <main id="main">
      <Helmet>
        <title>Dropdowns | YouAnimators</title>
        <meta
          name="description"
          content="Pagina de animaciones para tus dropdowns para copiar y pegar"
        />
      </Helmet>
      <h2>Animaciones para tus dropdowns</h2>
      <div className="muestra-dropdown">
        <Dropdown dropdownTarget={dropdownTarget} />
      </div>
      <FilterAnimations
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        availableTypes={availableTypes}
      />

      <section className="animations-container">
        <ListAnimationElementComplex
          target={dropdownTarget}
          filteredList={filteredList}
          setSelectedAnim={setSelectedAnim}
        />
      </section>
      <CopyPopover anim={selectedAnim} category={selectedCategory} />
    </main>
  );
}
