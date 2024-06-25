import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ProductType } from "../type";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { API_SERVER_DOMAIN } from "../components/ApiServer";
import { Delete, Edit } from "@mui/icons-material";

const ProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<ProductType | null>(null);

  const handlePushPurchasePage = () => {
    if (productId) {
      navigate(`/purchase/${productId}`);
    }
  };

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
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4, mt: 5 }}>
        {product?.thumbnail && (
          <img
            src={`${API_SERVER_DOMAIN}/${product.thumbnail}`}
            alt={product?.name}
            style={{ width: "100%", maxWidth: 400 }}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {product.name}
        </Typography>
        <ButtonGroup>
          <Button variant="text" color="warning">
            <Delete />
          </Button>
          <Button variant="text" color="info">
            <Edit />
          </Button>
        </ButtonGroup>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 4 }}>
          {product?.price} 원
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {product?.explanation}
        </Typography>
        <ButtonGroup sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained">장바구니</Button>
          <Button variant="contained" onClick={handlePushPurchasePage}>
            구매하기
          </Button>
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default ProductPage;
