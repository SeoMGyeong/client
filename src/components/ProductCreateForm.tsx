import { useState } from "react";
import { ProductType } from "../type";

const ProductCreateForm = () => {
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState<ProductType[]>([]);

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

  return (
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
  );
};

export default ProductCreateForm;
