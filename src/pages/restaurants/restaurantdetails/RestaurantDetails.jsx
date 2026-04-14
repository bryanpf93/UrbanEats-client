import "./RestaurantDetails.css"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ProductCard from "../../../components/restaurants/productcard/ProductCard"
import { AuthContext } from "../../../context/auth.context"
// import RestaurantMap from "../../../components/map/RestaurantMap"


const API_URL = import.meta.env.VITE_API_URL

function RestaurantDetails() {

  const [restaurant, setRestaurant] = useState(null)
  const [products, setProducts] = useState(null)

  const { restaurantId } = useParams()
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)
  const isAdmin = user?.role === "admin"

  const storedToken = localStorage.getItem("authToken")

  const getRestaurant = () => {

    axios
      .get(
        `${API_URL}/api/restaurants/${restaurantId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setRestaurant(response.data)
      })
      .catch((err) => {
        console.log("Error getting restaurant", err)
      })
  }

  const getProductsFromRestaurant = () => {

    axios
      .get(
        `${API_URL}/api/restaurants/${restaurantId}/products`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setProducts(response.data)
      })
      .catch((err) => {
        console.log("Error getting products from restaurant", err)
      })
  }

  const handleDelete = () => {

    axios
      .delete(
        `${API_URL}/api/restaurants/${restaurantId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate("/restaurants")
        console.log(response.data)
      })
      .catch((err) => {
        console.log("Error deleting restaurant", err)
      })


  }


  useEffect(() => {
    getRestaurant()
    getProductsFromRestaurant()
  }, [restaurantId])

  if (restaurant === null) {
    return <h1>Loading ...</h1>
  }

  if (products === null) {
    return <h1>Loading ...</h1>
  }

  return (
    <div className="restaurant-details">
      <h1>{restaurant.name}</h1>
      <img src={restaurant.image} alt={restaurant.name} />
      <p><strong>Description:</strong> {restaurant.description}</p>
      <p><strong>Category:</strong> {restaurant.category}</p>
      <p><strong>Address: </strong>{restaurant.address}</p>
      <p><strong>Phone:</strong> {restaurant.phone}</p>
      <p><strong>Rating:</strong> {restaurant.rating}</p>

      {isAdmin && (
        <>
          <Link to={`/admin/restaurants/${restaurantId}/edit`}><button>Edit Restaurant</button></Link>
          <button onClick={handleDelete}>Borrar Restaurant</button>
          <Link to={`/admin/restaurants/${restaurantId}/products/new`}><button>Crear Producto</button></Link>
        </>
      )}

      <h3>Products: </h3>
      <div className="products-container">
        {products.map((product) => {
          return (
            <ProductCard
              key={product._id}
              product={product}
              refreshProducts={getProductsFromRestaurant}
            />
          )
        })}
      </div>
      {/* <div className="map-container">
          <RestaurantMap restaurant={restaurant} />
        </div> */}

    </div>
  )
}

export default RestaurantDetails