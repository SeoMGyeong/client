import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductType } from "../interface";

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<ProductType | null>(null);
  useEffect(() => {
    fetch(`/product/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product));
  }, []);

  if (!product) {
    return <h1>찾으시는 상품이 없습니다.</h1>;
  }
  return (
    <div>
      <h1>{product?.name} 상세페이지</h1>
      <span>{product?.price} 원</span>
      <p>{product?.explanation}</p>
    </div>
  );
};

export default ProductPage;
