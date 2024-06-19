interface ProductType {
  id: number;
  name: string;
  explanation: string;
  price: number;
}

const App = () => {
  const products: ProductType[] = [
    {
      id: 0,
      name: "Iphone 15 Max",
      explanation: "아이폰 설명을 적어줍니다.",
      price: 1230000,
    },
    {
      id: 1,
      name: "Ipad Pro",
      explanation: "아이패드 설명을 적어줍니다.",
      price: 1500000,
    },
  ]; // 서버구동시 필요없음.
  console.log(products);
  return (
    <>
      {products.map((product) => (
        <div>
          <div>{product.id}</div>
          <div>{product.name}</div>
          <div>{product.explanation}</div>
          <div>{product.price}</div>
        </div>
      ))}
      <h1>{products[0].id}</h1>
      <h1>{products[0].name}</h1>
      <h1>{products[0].explanation}</h1>
      <h1>{products[0].price}</h1>
    </>
  );
};

export default App;
