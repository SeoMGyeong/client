import { useEffect, useState } from "react";
import "../style.scss";
import { ProductType } from "../interface";
import ProductItem from "../components/productItem";

const Homepage = () => {
  useEffect(() => {
    fetch("/product")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);
  // 서버구동시 필요없음.
  /* const [상태값, 상태값지정] = useState(초기값); */

  const [products, setProducts] = useState<ProductType[]>([]);
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [price, setPrice] = useState(0);

  // 상품생성
  const handleCreate = (newProduct: Omit<ProductType, "id">) => {
    fetch("/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => setProducts((prev) => [...prev, data.product]));
  };

  // 상품 삭제
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
      <form
        onSubmit={(e) => {
          e.preventDefault(); // 페이지를 수동으로 새로고침(F5 또는 브라우저의 새로고침 버튼 클릭)하면 입력된 데이터는 사라집니다.
          handleCreate({ name, explanation, price });
        }}
      >
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="상품명"
        />
        <input
          onChange={(e) => setExplanation(e.target.value)}
          type="text"
          placeholder="상품설명"
        />
        <input
          onChange={(e) => setPrice(parseInt(e.target.value, 10))} // 정수로 바꾸고 10진수 형태로 표현할거임.
          type="number"
          placeholder="상품가격"
        />
        <input type="submit" value="상품등록" />
      </form>
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

export default Homepage;
