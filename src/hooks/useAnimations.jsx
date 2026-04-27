import { useState, useEffect, useMemo } from "react";
import data from "@/animations.json";

export function useAnimations({ initialCategory = "dropdown" }) {
  const [animations] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedType, setSelectedType] = useState("Todos");

  const getCategories = (category) => {
    if (Array.isArray(category)) return category;
    if (typeof category === "string") return [category];
    return [];
  };

  const availableTypes = useMemo(() => {
    // Filtramos primero por categoría para que los tipos sean relevantes al contexto
    const categoryAnims = animations.filter((anim) => {
      const categories = getCategories(anim.category);
      return categories.includes(selectedCategory);
    });

    // Extraemos los tipos, añadimos 'Todos' y quitamos duplicados con Set
    const types = categoryAnims.map((anim) => anim.type);
    return ["Todos", ...new Set(types)];
  }, [animations, selectedCategory]);

  // Filtramos el array base directamente por la categoría inicial
  const filteredList = useMemo(() => {
    const list = animations.filter((anim) => {
      const categories = getCategories(anim.category);
      const matchCategory = categories.includes(selectedCategory);
      const matchType = selectedType === "Todos" || anim.type === selectedType;
      return matchCategory && matchType;
    });
    return list;
  }, [selectedCategory, selectedType, animations]);

  // Función para aplicar la animación al CSS
  const applyAnimation = (cssValue) => {
    document.documentElement.style.setProperty(
      `--${selectedCategory}-animation`,
      cssValue,
    );
  };

  // Opcional: Inicializar con la primera animación de la lista al cargar
  useEffect(() => {
    // if (filteredList.length > 0) {
    //   applyAnimation(filteredList[0].cssValue);
    // }
  }, [selectedCategory]); // Se dispara si cambias de categoría

  return {
    filteredList,
    availableTypes,
    selectedType,
    setSelectedType,
    applyAnimation,
    selectedCategory,
    setSelectedCategory,
  };
}
