import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./components/pages/Test";
import Index from "./components/pages/Index";
import Result from "./components/pages/Result";
function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/test" element={<Index />} />
        <Route path="/testing" element={<Test />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
