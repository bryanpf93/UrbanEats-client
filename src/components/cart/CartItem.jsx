import "./CartItem.css"
import { useContext } from "react"
import { CartContext } from "../../context/cart.context"

function CartItem({ item }) {

  const { addToCart, removeFromCart, updateQuantity } = useContext(CartContext)

  const handleIncrease = () => {
    addToCart({
      _id: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId: item.restaurantId
    })
  }

  const handleDecrease = () => {

    if (item.quantity === 1) {
      return removeFromCart(item.productId)
    }

    updateQuantity(
      item.productId,
      item.quantity - 1
    )
  }

  return (
    <div className="item-container">
      <h3>{item.name}</h3>
      <img src={item.image} alt={item.name} />
      <p>{item.price}€</p>

      <div>
        <button onClick={handleDecrease}>-</button>
        <span> {item.quantity} </span>
        <button onClick={handleIncrease}>+</button>
      </div>

      <button onClick={() => removeFromCart(item.productId)}>Eliminar</button>
    </div>
  )
}

export default CartItem