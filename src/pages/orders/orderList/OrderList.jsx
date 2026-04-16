import { useEffect, useState } from "react"
import "./OrderList.css"
import axios from "axios"
import OrderCard from "../../../components/order/OrderCard"
import {
  Container,
  Title,
  Text,
  Skeleton
} from "@mantine/core"
import OrderCardSkeleton from "../../../components/loader/SkeletonOrderCard"

const API_URL = import.meta.env.VITE_API_URL

function OrderList() {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

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
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      })

  }
  useEffect(() => {
    getOrders()
  }, [])


  return (
    <Container size="xl" py="xl">

      {loading ? (
        <Skeleton height={38} width={180} mb="xl" />
      ) : (
        <Title mb="xl">
          Mis pedidos
        </Title>
      )}

      {loading ? (

        Array.from({ length: 5 }).map((_, index) => (
          <OrderCardSkeleton key={index} />
        ))

      ) : orders.length === 0 ? (

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