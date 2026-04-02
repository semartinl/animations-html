import { Routes, Route } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import Home from "./pages/Home";
import Headers from "./pages/Headers";
import Dropdowns from "./pages/Dropdowns";
import PostNewAnimation from "./pages/PostNewAnimation";
import Popups from "./pages/Popups";

function App() {
  return (
    <>
      <SideBar />

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Dropdowns />} />
        <Route path="/headers" element={<Headers />} />
        <Route path="/dropdowns" element={<Dropdowns />} />
        <Route path="/popups" element={<Popups />} />
        <Route path="/new" element={<PostNewAnimation />} />
      </Routes>
    </>
  );
}

export default App;
