import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { ProductType } from "../type";
import { API_SERVER_DOMAIN } from "./ApiServer";
import { Add, Delete, Remove } from "@mui/icons-material";

type Props = {
  cart: ProductType;
};

const CartItem = ({ cart }: Props) => {
  return (
    <Card sx={{ display: "flex", marginBottom: 2 }}>
      {cart.thumbnail && (
        <CardMedia
          sx={{ width: 100 }}
          image={`${API_SERVER_DOMAIN}/${cart.thumbnail}`}
          title={cart.name}
        />
      )}
      <CardContent sx={{ width: "100%" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {cart.name}
        </Typography>
        <Typography variant="h6" fontSize={14} color={"#888888"}>
          {cart.price.toLocaleString("KR-ko")}원
        </Typography>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <IconButton>
              <Remove />
            </IconButton>
            {0}
            <IconButton>
              <Add />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartItem;
