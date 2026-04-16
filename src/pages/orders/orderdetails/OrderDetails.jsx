import { useNavigate, useParams } from "react-router-dom"
import "./OrderDetails.css"
import restaurantFallBack from "../../../assets/images/restaurant.png"
import { useEffect, useState } from "react"
import axios from "axios"
import {
  Container,
  Card,
  Title,
  Text,
  Image,
  Button,
  Group,
  Divider
} from "@mantine/core"
import ConfirmModal from "../../../components/modals/ConfirmModal"

const API_URL = import.meta.env.VITE_API_URL

function OrderDetails(){

  const { orderId } = useParams()
  const navigate = useNavigate()

  const [order, setOrder] = useState(null)

  useEffect(() => {

    const storedToken = localStorage.getItem("authToken")

    axios
      .get(
        `${API_URL}/api/orders/${orderId}`,
        { headers: { Authorization: `Bearer ${storedToken}` }}
      )
      .then((response) => {
        setOrder(response.data)
      })
      .catch((err) => {
        console.log("Error getting order", err)
      })

  }, [])
  
  const handleDelete = () => {

    const storedToken = localStorage.getItem("authToken")

    axios
      .delete(
        `${API_URL}/api/orders/${orderId}`,
        { headers: { Authorization: `Bearer ${storedToken}` }}
      )
      .then(() => {
        navigate("/orders")
      })
      .catch((err) => {
        console.log("Error deleting order", err)
      })
  }

  const confirmDeleteOrder = () => {
  ConfirmModal({
    title: "Eliminar pedido",

    message: "¿Seguro que quieres eliminar este pedido?",

    confirmText: "Eliminar",

    onConfirm: handleDelete,
  });
};

  if (order === null) {
    return <p>Cargando Pedido ...</p>
  }

  return (
  <Container size="md" py="xl">

    <Title mb="md">
      Pedido detallado
    </Title>

    <Card
      shadow="sm"
      padding="xl"
      radius="xl"
      withBorder
    >

      <Image
        src={order.restaurant?.image}
        fallbackSrc={restaurantFallBack}
        h={300}
        radius="xl"
        mb="lg"
      />

      <Title order={2}>
        {order.restaurant?.name || "Restaurante elminado"}
      </Title>

      <Text c="dimmed">
        Pedido #{order._id}
      </Text>

      <Text mt="md">
        Fecha: {new Date(order.createdAt).toLocaleDateString()}
      </Text>

      <Text>
        Hora: {new Date(order.createdAt).toLocaleTimeString()}
      </Text>

      <Text mb="lg">
        Estado: {order.status}
      </Text>

      <Divider my="md" />

      <Title order={3} mb="md">
        Productos
      </Title>

      {order.products.map((item) => (
        <Group
          key={item._id}
          justify="space-between"
          mb="sm"
        >
          <Text>
            {item.product?.name || "Producto eliminado"}
          </Text>

          <Text>
            x{item.quantity}
          </Text>
        </Group>
      ))}

      <Divider my="lg" />

      <Text fw={700} size="lg">
        Total: {order.total}€
      </Text>
      <div>
      <Button
        mt="xl"
        color="red"
        onClick={confirmDeleteOrder}
      >
        Borrar pedido
      </Button>
      </div>
      

    </Card>

  </Container>
)
}

export default OrderDetails