export interface ProductType {
  id: number;
  name: string;
  explanation: string;
  price: number;
}

export interface ProductItemProps {
  product: ProductType;
  onDelete: (id: number) => void;
  onUpdate: (product: ProductType) => void;
}
