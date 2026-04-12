import { useContext } from "react"
import CartItem from "../../components/cart/CartItem"
import { CartContext } from "../../context/cart.context"

function Cart(){

  const { cart, total, clearCart } = useContext(CartContext)
  console.log(cart)
  
  return(

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

      <button>Finalizar pedido</button>
    
    </>
    
    
  )

}

export default Cart