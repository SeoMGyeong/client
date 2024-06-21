import { useState } from "react";
import { ProductItemProps } from "../type";
import { Link } from "react-router-dom";

const ProductItem = ({ product, onDelete, onUpdate }: ProductItemProps) => {
  const { id, name, price, explanation } = product;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [editExplanation, setEditExplanation] = useState(product.explanation);
  const [editPrice, setEditPrice] = useState(product.price);
  return (
    <div>
      <div>{id}</div>
      <div>
        <Link to={`/${id}`}>{name}</Link>
      </div>
      <div>{price}</div>
      <div>{explanation}</div>
      <button type="button" onClick={() => onDelete(id)}>
        삭제
      </button>
      <button type="button" onClick={() => setIsEditMode((prev) => !prev)}>
        수정
      </button>

      {isEditMode && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onUpdate({
              id,
              name: editName,
              price: editPrice,
              explanation: editExplanation,
            });
          }}
        >
          <input
            type="text"
            placeholder="상품명"
            onChange={(e) => setEditName(e.target.value)}
            value={editName}
          />
          <input
            type="text"
            placeholder="상품설명"
            onChange={(e) => setEditExplanation(e.target.value)}
            value={editExplanation}
          />
          <input
            type="number"
            placeholder="가격"
            onChange={(e) => setEditPrice(parseInt(e.target.value, 10))}
            value={editPrice}
          />
          <input type="submit" value="수정하기" />
        </form>
      )}
    </div>
  );
};

export default ProductItem;
