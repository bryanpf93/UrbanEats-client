import { useEffect, useState } from "react"
import "./OrderList.css"
import axios from "axios"
import OrderCard from "../../../components/order/OrderCard"
import {
  Container,
  Title,
  Text
} from "@mantine/core"

const API_URL = import.meta.env.VITE_API_URL

function OrderList() {

  const [orders, setOrders] = useState([])

  const getOrders = () => {

    const storedToken = localStorage.getItem("authToken")

    axios
      .get(
        `${API_URL}/api/orders/user`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setOrders(response.data)
      })
      .catch((err) => {
        console.log("Error getting orders", err)
      })

  }

  useEffect(() => {
    getOrders()
  }, [])


  return (
  <Container size="xl" py="xl">

    <Title mb="xl">
      Mis pedidos
    </Title>

    {orders.length === 0 ? (

      <Text size="lg">
        No tienes pedidos todavía
      </Text>

    ) : (

      orders.map((order) => (
        <OrderCard
          key={order._id}
          order={order}
        />
      ))

    )}

  </Container>
)
}

export default OrderList