import { Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
const CartPage = () => {
  const { cartItems, totalAmount } = useCart();

    // useEffect(() => {
    //   if (!token) {
    //     return;
    //   }
    //   const fetchCart = async () => {
    //     const response = await fetch(`${BASE_URL}/cart`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     if (!response.ok) {
    //       setError("Failed to fetch cart");
    //     }
    //     const data = await response.json();
    //     setCart(data);
    //   };
    //   fetchCart();
    // }, [token]);
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.productId}>
              <Typography variant="body1">{item.title}</Typography>
              <Typography variant="body1">{item.quantity}</Typography>
              <Typography variant="body1">{item.unitPrice}</Typography>
            </div>
          ))}
          <Typography variant="body1">Total: {totalAmount}</Typography>
        </>
      )}
    </Container>
  );
};

export default CartPage;
