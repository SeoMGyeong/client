import React, { ChangeEvent, useState } from "react";
import { ProductType } from "../type";
import { Button, Container, TextField, Typography } from "@mui/material";
import ThumbnailUploader from "./ThumbnailUploader";

const ProductCreateForm = () => {
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  // 상품생성(등록)
  const handleCreate = (event: React.FormEvent) => {
    event.preventDefault();
    const newProduct: Omit<ProductType, "id"> = {
      name,
      explanation,
      price,
    };
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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };
  const handleExplanationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setExplanation(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        상품등록
      </Typography>
      <form onSubmit={handleCreate}>
        <TextField
          label="상품명"
          fullWidth
          value={name}
          onChange={handleNameChange}
          margin="normal"
        />
        <TextField
          label="가격"
          fullWidth
          value={price}
          onChange={handlePriceChange}
          margin="normal"
        />
        <TextField
          label="상품설명"
          fullWidth
          multiline
          rows={5}
          value={explanation}
          onChange={handleExplanationChange}
          margin="normal"
        />
        <ThumbnailUploader
          value={thumbnail}
          onChange={(file) => setThumbnail(file)}
        />
        <Button
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          sx={{ marginTop: 6 }}
        >
          등록
        </Button>
      </form>
    </Container>
  );
};

export default ProductCreateForm;
