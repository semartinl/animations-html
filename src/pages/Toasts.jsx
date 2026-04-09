import { useRef, useState } from "react";
import { useAnimations } from "../hooks/useAnimations";
import CopyPopover from "../components/CopyPopover";
import FilterAnimations from "../components/FilterAnimations";
import ListAnimationElementComplex from "../components/AnimationElements/ListAnimationElementComplex";
import CheckIcon from "../../public/icons/CheckIcon";
import styles from "@/styles/toasts.module.css";
import Toast from "../components/Toasts/Toast";
export default function Toasts() {
  const toastRef = useRef(null);

  const {
    filteredList,
    setSelectedType,
    selectedType,
    availableTypes,
    selectedCategory,
  } = useAnimations({
    initialCategory: "toast",
  });
  const [selectedAnim, setSelectedAnim] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (description, type = "correct") => {
    const id = Date.now();

    setToasts((prev) => [
      ...prev,
      {
        id,
        description,
        type,
        animation: selectedAnim?.cssValue ?? "slideDown",
        animationTime: selectedAnim?.animationTime ?? 0.3,
        time: 3000,
      },
    ]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <main id="main">
      <h2>Animaciones para tus dropdowns</h2>
      <div className="muestra-dropdown">
        <button
          popoverTarget="toast"
          onClick={() => addToast("Usuario eliminado", "correct")}
          className={`btn ${styles["toast-btn"]}`}
        >
          Abrir toast
        </button>
      </div>
      <FilterAnimations
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        availableTypes={availableTypes}
      />

      <section className="animations-container">
        <ListAnimationElementComplex
          filteredList={filteredList}
          setSelectedAnim={setSelectedAnim}
        />
      </section>
      <CopyPopover anim={selectedAnim} category={selectedCategory} />
      <section className={styles["toast-example-list"]}>
        {toasts.map((toast) => {
          return (
            <Toast
              key={toast.id}
              description={toast.description}
              type={toast.type}
              animation={toast.animation}
              animationTime={toast.animationTime}
              time={toast.time}
              onClose={() => removeToast(toast.id)}
            >
              {" "}
              <CheckIcon />
            </Toast>
          );
        })}
      </section>
    </main>
  );
}
