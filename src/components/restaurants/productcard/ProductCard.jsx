import { useContext } from "react"
import "./ProductCard.css"
import { CartContext } from "../../../context/cart.context"
import { AuthContext } from "../../../context/auth.context"
import { useNavigate } from "react-router-dom"



function ProductCard({product}){

  const { addToCart } = useContext(CartContext)
  const { isLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  function handleAddToCart(){
    if(!isLoggedIn){
      navigate("/login")
      return
    }

    addToCart(product)
  }

  return(
    <div className="product-container">
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <button onClick={handleAddToCart}>
                Añadir al carrito 🛒
              </button>
            </div>
  )
}

export default ProductCard