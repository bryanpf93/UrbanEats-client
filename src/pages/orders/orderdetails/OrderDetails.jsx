import { useNavigate, useParams } from "react-router-dom"
import "./OrderDetails.css"
import { useEffect, useState } from "react"
import axios from "axios"

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
        console.log("Error deleting order")
      })

  }

  if (order === null) {
    return <p>Cargando Pedido ...</p>
  }

  return(
    <div className="order-details">
      
      <h1>Pedido Detallado</h1>
      <h2>{order.restaurant.name}</h2>
      <img src={order.restaurant.image} alt={order.restaurant.name} />
      <p>#{order._id}</p>
      <span>Fecha: {new Date(order.createdAt).toLocaleDateString()}</span>
      <span>  Hora: {new Date(order.createdAt).toLocaleTimeString()}</span>
      <p>Estado: {order.status}</p>

      <div className="order-product">
        {order.products.map((item) => {
          return <p key={item._id}>
            {item.product.name} x{item.quantity}
          </p>
        })}
      </div>
      <button onClick={handleDelete}>Borrar Pedido</button>
      <p>Total: {order.total}€</p>
    </div>
  )
}

export default OrderDetails