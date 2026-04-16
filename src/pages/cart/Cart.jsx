import "./Cart.css"
import { useContext, useEffect, useState } from "react"
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
  Group,
  Grid,
  Skeleton
} from "@mantine/core";
import ConfirmModal from "../../components/modals/ConfirmModal"
import CartItemSkeleton from "../../components/loader/SkeletonCartItem"

const API_URL = import.meta.env.VITE_API_URL

function Cart() {

  const { cart, total, clearCart } = useContext(CartContext)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

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

  const confirmClearCart = () => {
    ConfirmModal({
      title: "Vaciar carrito",

      message: "¿Seguro que quieres eliminar todos los productos del carrito?",

      confirmText: "Vaciar",

      onConfirm: clearCart,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <Container size="xl" py="xl">

      {loading ? (

        <>
          <Grid gutter="xl">
            {Array.from({ length: 4 }).map((_, index) => (
              <Grid.Col
                key={index}
                span={{
                  base: 12,
                  sm: 6,
                  md: 6,
                  lg: 6
                }}
              >
                <CartItemSkeleton />
              </Grid.Col>
            ))}
          </Grid>

          <Card
            shadow="sm"
            padding="xl"
            radius="xl"
            withBorder
            mt="xl"
          >
            <Skeleton height={28} width={200} mb="md" />

            <Skeleton height={24} width={120} mb="lg" />

            <Group mt="lg" justify="center">
              <Skeleton height={36} width={120} />
              <Skeleton height={36} width={140} />
              <Skeleton height={36} width={140} />
            </Group>
          </Card>
        </>

      ) : cart.length === 0 ? (

        <Text size="lg">
          Tu carrito está vacío
        </Text>

      ) : (

        <>
          <Grid gutter="xl">

            {cart.map((item) => (
              <Grid.Col
                key={item.productId}
                span={{
                  base: 12,
                  sm: 6,
                  md: 6,
                  lg: 6
                }}
              >
                <CartItem item={item} />
              </Grid.Col>
            ))}

          </Grid>

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

            <Group mt="lg" justify="center">

              <Button color="red" onClick={confirmClearCart}>
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

              <Button color="dark" onClick={handleCheckout}>
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