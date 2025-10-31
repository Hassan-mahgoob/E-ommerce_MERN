import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
