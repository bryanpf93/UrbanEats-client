import { useEffect, useState } from "react"
import "./OrderList.css"
import axios from "axios"

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

    console.log(orders)

  return (
    <h1>Mis pedidos</h1>
  )
}

export default OrderList