import { useContext } from "react"
import CartItem from "../../components/cart/CartItem"
import { CartContext } from "../../context/cart.context"
import axios from "axios"
import { useNavigate } from "react-router-dom"

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

    <>
      <h1>🛒 MI CARRITO</h1>

      {cart.length === 0 &&
        <p>Tu carrito esta vacio</p>
      }

      {cart.map((item) => {
        return (
          <CartItem
            key={item.productId}
            item={item}
          />
        )
      })}

      <button onClick={clearCart}>Vaciar el carrito</button>

      <h3>Total: {total}€</h3>

      <button onClick={handleCheckout}>Realizar pedido</button>

    </>


  )

}

export default Cart