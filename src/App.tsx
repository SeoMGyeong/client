import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { ProductPage } from "./pages";
import ProductCreatePage from "./pages/ProductCreatePage";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="/create" element={<ProductCreatePage />} />
      </Routes>
    </Layout>
  );
};

export default App;
