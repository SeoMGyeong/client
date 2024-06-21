import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { ProductPage } from "./pages";
import ProductCreatePage from "./pages/ProductCreatePage";

const App = () => {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="/:productId" element={<ProductPage />} />
      <Route path="/create" element={<ProductCreatePage />} />
    </Routes>
  );
};

export default App;
