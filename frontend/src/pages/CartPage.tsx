import { Box, ButtonGroup, Container, Button, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
const CartPage = () => {
  const { cartItems, totalAmount } = useCart();

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty</Typography>
      ) : (
        <>
          <Box display="flex" flexDirection="column" gap={4}>
            {cartItems.map((item) => (
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={2}
                justifyContent="space-between"
                sx={{ border: "1px solid #ccc", p: 2, borderRadius: 5 }}
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap={2}
                >
                  <img src={item.image} alt={item.title} width={100} />
                  <Box>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography>
                      {item.quantity} X {item.unitPrice} $
                    </Typography>
                    <Button>Remove Item</Button>
                  </Box>
                </Box>
                <ButtonGroup
                  variant="contained"
                  aria-label="Basic outlined button group"
                >
                  <Button>-</Button>
                  <Button>+</Button>
                </ButtonGroup>
              </Box>
            ))}
          </Box>
          <Typography variant="body1">Total: {totalAmount} $</Typography>
        </>
      )}
    </Container>
  );
};

export default CartPage;
