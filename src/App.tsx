import { useRef, useState } from "react";
import "./style.scss";
import { ProductType } from "./interface";
import ProductItem from "./components/productItem";

const App = () => {
  // 서버구동시 필요없음.
  /* const [상태값, 상태값지정] = useState(초기값); */

  const [products, setProducts] = useState<ProductType[]>([
    {
      id: 0,
      name: "Iphone 15 Max",
      explanation: "아이폰 설명을 적어줍니다.",
      price: 1230000,
    },
  ]);
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [price, setPrice] = useState(0);

  const fakeId = useRef(0);
  // 상품생성
  const handleCreate = (newProduct: Omit<ProductType, "id">) => {
    // Omit -> 제외
    fakeId.current += 1;
    setProducts([...products, { id: fakeId.current, ...newProduct }]);
  }; // 등록하는 함수

  // 상품 삭제
  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // 상품수정
  const handleUpdate = (updateProduct: ProductType) => {
    setProducts(
      products.map((product) =>
        product.id === updateProduct.id ? updateProduct : product
      )
    );
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

export default App;
