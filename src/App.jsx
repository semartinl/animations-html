import { Routes, Route } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import Home from "./pages/Home";
import Headers from "./pages/Headers";
import Dropdowns from "./pages/Dropdowns";

function App() {
  return (
    <>
      <SideBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/headers" element={<Headers />} />
        <Route path="/dropdowns" element={<Dropdowns />} />
      </Routes>
    </>
  );
}

export default App;
