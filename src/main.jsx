import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "@/styles/styles.css";
import "./styles/commons-styles.css";
import "./styles/Animations/dropdows.css";
import "./styles/popover.css";
import "./styles/post-new-animation-page.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
