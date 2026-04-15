import "./Cart.css"
import { useContext } from "react"
import CartItem from "../../components/cart/CartItem"
import { CartContext } from "../../context/cart.context"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Title,
  Text,
  Card,
  Button,
  Group
} from "@mantine/core";

const API_URL = import.meta.env.VITE_API_URL

function Cart() {

  const { cart, total, clearCart } = useContext(CartContext)
  const navigate = useNavigate()

  const handleCheckout = () => {

    const formattedProducts = cart.map(item => ({
      product: item.productId,
      quantity: item.quantity,
      price: item.price
    }))

    if (cart.length === 0) return

    const newOrder = {
      restaurantId: cart[0].restaurantId,
      products: formattedProducts,
      total
    }

    const storedToken = localStorage.getItem("authToken")

    axios
      .post(
        `${API_URL}/api/orders`,
        newOrder,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        console.log("Pedido creado", response.data)
        clearCart()
        navigate("/orders")
      })
      .catch((err) => {
        console.log("Error creating order", err)
      })
  }

  console.log(cart)

  return (
  <Container size="xl" py="xl">

    <Title mb="xl">
      🛒 Mi carrito
    </Title>

    {cart.length === 0 ? (

      <Text size="lg">
        Tu carrito está vacío
      </Text>

    ) : (

      <>
        <div className="carts-container">
          {cart.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
            />
          ))}
        </div>

        <Card
          shadow="sm"
          padding="xl"
          radius="xl"
          withBorder
          mt="xl"
        >

          <Title order={3} mb="md">
            Resumen del pedido
          </Title>

          <Text size="lg" fw={600}>
            Total: {total}€
          </Text>

          <Group mt="lg" style={{
            display:"flex",
            justifyContent: "center"
          }}>

            <Button
              color="red"
              onClick={clearCart}
            >
              Vaciar carrito
            </Button>

            <Button
              variant="light"
              color="gray"
              onClick={() =>
                navigate(`/restaurants/${cart[0]?.restaurantId}`)
              }
            >
              Seguir comprando
            </Button>

            <Button
              color="dark"
              onClick={handleCheckout}
            >
              Realizar pedido
            </Button>

          </Group>

        </Card>
      </>
    )}

  </Container>
)

}

export default Cart