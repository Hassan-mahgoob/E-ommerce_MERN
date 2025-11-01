import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
