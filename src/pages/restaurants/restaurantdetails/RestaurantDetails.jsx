import "./RestaurantDetails.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProductCard from "../../../components/restaurants/productcard/ProductCard"


const API_URL = import.meta.env.VITE_API_URL

function RestaurantDetails(){

  const [restaurant, setRestaurant] = useState(null)
  const [products, setProducts] = useState(null)

  const { restaurantId } = useParams() 

  const getRestaurant = () => {

    axios
      .get(`${API_URL}/api/restaurants/${restaurantId}`)
      .then((response) => {
        setRestaurant(response.data)
      })
      .catch((err) => {
        console.log("Error getting restaurant", err)
      })
  }

  const getProductsFromRestaurant = () => {

    axios
      .get(`${API_URL}/api/restaurants/${restaurantId}/products`)
      .then((response) => {
        setProducts(response.data)
      })
      .catch((err) => {
        console.log("Error getting products from restaurant")
      })
  }


  useEffect(() => {
    getRestaurant()
    getProductsFromRestaurant()
  }, [restaurantId])
  
  if(restaurant === null) {
    return <h1>Loading ...</h1>
  }

  if(products === null) {
    return <h1>Loading ...</h1>
  }

  return(
    <div className="restaurant-details">
        <h1>{restaurant.name}</h1>
        <img src={restaurant.image} alt={restaurant.name} />
        <p>{restaurant.description}</p>

        <h3>Products: </h3>
        <div className="products-container">
          {products.map((product) => {
          return (
              <ProductCard 
                key={product._id}
                product={product}
              />
          )
        })}
        </div>
    </div>
  )
}

export default RestaurantDetails