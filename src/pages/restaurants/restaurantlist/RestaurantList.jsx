import "./RestaurantList.css"
import axios from "axios"
import { useEffect, useState } from "react"
import RestaurantCard from "../../../components/restaurants/restaurantcard/RestaurantCard"


const API_URL = import.meta.env.VITE_API_URL

function RestaurantList(){

  const [restaurants, setRestaurants] = useState(null)

  const getAllRestaurants = () => {

    axios
      .get(`${API_URL}/api/restaurants`)
      .then((response) => {
        setRestaurants(response.data)
      })
      .catch((err) => {
        console.log("Error getting projects from DB", err)
      })
  }

  useEffect(() => {
    getAllRestaurants()
  }, [])

  if(restaurants === null){
    return <h1>Loading ....</h1>
  }

  console.log(restaurants)


  return(
    <>
      <h1>List of Restaurants</h1>
      <div className="restaurants-container">
      
      {restaurants.map((restaurant) => {
        return (
          <RestaurantCard 
            key={restaurant._id}
            restaurant={restaurant}
          />
        )
      })}
    </div>
    </>
    

    
  )
}

export default RestaurantList