import { useEffect, useState } from "react"
import "./OrderList.css"
import axios from "axios"
import OrderCard from "../../../components/order/OrderCard"

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
    <div className="orders-container">

      <h1>Mis Pedidos</h1>

      {orders.length === 0 &&
        <p>No tienes pedidos</p>
      }

      {orders.map((order) => {
        return(
          <OrderCard 
            order={order}
          />
        )
      })}
    </div>
  )
}

export default OrderList