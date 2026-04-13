import { Link } from "react-router-dom"
import "./OrderCard.css"

function OrderCard({ order }) {

  return (
    <div key={order._id} className="order-container">
      <h3>{order.restaurant.name}</h3>
      <img src={order.restaurant.image} alt={order.restaurant.name}/>
      <span>Fecha: {new Date(order.createdAt).toLocaleDateString()}</span>
      <span>Hora: {new Date(order.createdAt).toLocaleTimeString()}</span>
      <p>Estado: {order.status}</p>

      <Link to={`/orders/${order._id}`}>
        <button>Mas detalles</button>
      </Link>

      <p>Total: {order.total}€</p>
    </div>
  )
}

export default OrderCard