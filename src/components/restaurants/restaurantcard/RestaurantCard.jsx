import { Link } from "react-router-dom"
import "./RestaurantCard.css"

function RestaurantCard({restaurant}) {

  return(
    <div className="restaurant-card">
            <img src={restaurant.image} alt={restaurant.name}/>
            <p><strong>{restaurant.name}</strong></p>
            <p><strong>Category: </strong>{restaurant.category}</p>
            <p><strong>Rating: </strong>{restaurant.rating}</p>
            <Link to={`/restaurants/${restaurant._id}`}>
              <button>More details</button>            
            </Link>
        </div>
  )
}

export default RestaurantCard