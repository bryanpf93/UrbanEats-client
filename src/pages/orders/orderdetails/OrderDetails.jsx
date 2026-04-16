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
  Divider,
  Skeleton
} from "@mantine/core"
import ConfirmModal from "../../../components/modals/ConfirmModal"

const API_URL = import.meta.env.VITE_API_URL

function OrderDetails() {

  const { orderId } = useParams()
  const navigate = useNavigate()

  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const storedToken = localStorage.getItem("authToken")

    axios
      .get(
        `${API_URL}/api/orders/${orderId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setOrder(response.data)
      })
      .catch((err) => {
        console.log("Error getting order", err)
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      })

  }, [])

  const handleDelete = () => {

    const storedToken = localStorage.getItem("authToken")

    axios
      .delete(
        `${API_URL}/api/orders/${orderId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
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

  return (
    <Container size="md" py="xl">

      {loading ? (
        <Skeleton height={38} width={220} mb="md" />
      ) : (
        <Title mb="md">
          Pedido detallado
        </Title>
      )}

      <Card
        shadow="sm"
        padding="xl"
        radius="xl"
        withBorder
      >

        {loading ? (

          <>
            <Skeleton height={300} radius="xl" mb="lg" />

            <Skeleton height={32} width="50%" mb="sm" />

            <Skeleton height={20} width="30%" mb="md" />

            <Skeleton height={18} width="40%" mb="sm" />
            <Skeleton height={18} width="35%" mb="sm" />
            <Skeleton height={18} width="25%" mb="lg" />

            <Divider my="md" />

            <Skeleton height={28} width={120} mb="md" />

            {Array.from({ length: 3 }).map((_, index) => (
              <Group
                key={index}
                justify="space-between"
                mb="sm"
              >
                <Skeleton height={18} width={140} />
                <Skeleton height={18} width={30} />
              </Group>
            ))}

            <Divider my="lg" />

            <Skeleton height={24} width={100} mb="xl" />

            <Skeleton height={36} width={140} radius="md" />
          </>

        ) : (

          <>
            <Image
              src={order.restaurant?.image}
              fallbackSrc={restaurantFallBack}
              h={300}
              radius="xl"
              mb="lg"
            />

            <Title order={2}>
              {order.restaurant?.name || "Restaurante eliminado"}
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

            <Button
              mt="xl"
              color="red"
              onClick={confirmDeleteOrder}
            >
              Borrar pedido
            </Button>
          </>

        )}


      </Card>

    </Container>
  )
}

export default OrderDetails