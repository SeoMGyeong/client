import { useEffect, useState } from "react";
import ProductItem from "./productItem";
import { ProductType } from "../type";

const ProductList = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    fetch("/product")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleDelete = (id: string) => {
    fetch(`/product/${id}`, { method: "DELETE" }).then((res) => {
      if (res.ok) {
        setProducts(products.filter((product) => product.id !== id));
      }
    });
  };

  // 상품수정
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

  return (
    <>
      <h2>상품 목록</h2>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </>
  );
};

export default ProductList;
