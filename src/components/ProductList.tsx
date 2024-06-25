import { useEffect, useState } from "react";
import ProductItem from "./productItem";
import { ProductType } from "../type";
import { CircularProgress, Grid } from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/product")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .finally(() => setIsLoading(false));
  }, []);

  /* 주석처리? 근데 하면 오류뜸
  const handleDelete = (id: string) => {
    fetch(`/product/${id}`, { method: "DELETE" }).then((res) => {
      if (res.ok) {
        setProducts(products.filter((product) => product.id !== id));
      }
    });
  };

  
  const handleUpdate = (updateProduct: ProductType) => {
    fetch(`/product/${updateProduct.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateProduct),
    }).then((res) => {
      if (res.ok) {
        setProducts(
          products.map((product) =>
            product.id === updateProduct.id ? updateProduct : product
          )
        );
      }
    });
  };
*/
  if (isLoading)
    return (
      <CircularProgress sx={{ position: "fixed", left: "50%", top: "50%" }} />
    );

  return (
    <>
      <h2>상품 목록</h2>
      <Grid container spacing={3}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
