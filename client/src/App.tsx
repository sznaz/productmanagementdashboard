import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Products from "./components/Products/Products";
import NewProduct from "./components/NewProduct/NewProduct";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />}/>
        <Route path="/products" element={<Products />} />
        <Route path="/new" element={<NewProduct />} />
        <Route path="/edit/:id" element={<NewProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
