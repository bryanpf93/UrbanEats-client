import { useContext } from "react"
import "./ProductCard.css"
import { CartContext } from "../../../context/cart.context"
import { AuthContext } from "../../../context/auth.context"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

function ProductCard({ product, refreshProducts }) {

  console.log(product)
  const { addToCart, reloadCart } = useContext(CartContext)
  const { isLoggedIn, user } = useContext(AuthContext)
  const navigate = useNavigate()

  const isAdmin = user?.role === "admin"

  function handleAddToCart() {
    if (!isLoggedIn) {
      navigate("/login")
      return
    }

    addToCart(product)
  }

  const handleDelete = () => {
    const storedToken = localStorage.getItem("authToken")
    axios
      .delete(
        `${API_URL}/api/products/${product._id}`, 
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => {
        refreshProducts()
        reloadCart()
        navigate(`/restaurants/${product.restaurant}`)
      })
      .catch((err) => {
        console.log("Error deleting product", err)
      })
  }

  return (
    <div className="product-container">
      <img src={product.image} alt={product.name} />
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <button onClick={handleAddToCart}>
        Añadir al carrito 🛒
      </button>

      {isAdmin && (
        <>
          <Link to={`/admin/restaurants/${product.restaurant}/products/${product._id}/edit`}>
            <button>Editar</button>
          </Link>
          <button onClick={handleDelete}>Borrar</button>
        </>
      )}

      
    </div>
  )
}

export default ProductCard