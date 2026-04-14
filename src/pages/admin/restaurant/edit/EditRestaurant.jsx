import { useNavigate, useParams } from "react-router-dom"
import "./EditRestaurant.css"
import { useEffect, useState } from "react"
import axios from "axios"


function EditRestaurant(){

  const API_URL = import.meta.env.VITE_API_URL
  const { restaurantId } = useParams()
  const navigate = useNavigate()
  const storedToken = localStorage.getItem("authToken")

  const [name, setName] = useState("")  
  const [category, setCategory] = useState("Otro")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState("")
  const [latitude, setLatitude] = useState("")  
  const [longitude, setLongitude] = useState("")
  const [phone, setPhone] = useState("")
  const [rating, setRating] = useState(0)


  const getRestaurant = () => {

    axios      
      .get(
        `${API_URL}/api/restaurants/${restaurantId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneRestaurant = response.data
        setName(oneRestaurant.name)
        setCategory(oneRestaurant.category)
        setImage(oneRestaurant.image)
        setDescription(oneRestaurant.description)
        setAddress(oneRestaurant.address)
        setLatitude(oneRestaurant.location.coordinates[1])
        setLongitude(oneRestaurant.location.coordinates[0])
        setPhone(oneRestaurant.phone)
        setRating(oneRestaurant.rating)
      })
      .catch((err) => {
        console.log("Error getting restaurant ", err)
      })
  }

  useEffect(() => {
    getRestaurant()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    const newDetails = {
      name,
      category,
      image,
      description,
      address,
      location: {
        type: "Point",
        coordinates: [Number(longitude), Number(latitude)]
      },
      phone,
      rating
    }

    axios
      .put(
        `${API_URL}/api/restaurants/${restaurantId}`,
        newDetails,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate(`/restaurants/${restaurantId}`)
        console.log(response.data)
      })
      .catch((err) => {
        console.log("Error updating restaurant", err)
      })

  }

  return(
    <div className="form-edit-restaurant">
      <h1>Edit Restaurant</h1>
      <form onSubmit={handleSubmit}>
        {/* que el label envuelva el input y el input debera tener el valor que tiene el restaurante */}
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>

        <label>
          Categoría:
          <select
            name="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="Otro">Otro</option>
            <option value="Italiana">Italiana</option>
            <option value="Japonesa">Japonesa</option>
            <option value="Mexicana">Mexicana</option>
            <option value="Española">Española</option>
            <option value="Hamburguesas">Hamburguesas</option>
            <option value="Peruana">Peruana</option>
          </select>
        </label>

        <label>
          Imagen:
          <input
            type="text"
            name="image"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </label>

        <label>
          Descripción:
          <textarea
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>

        <label>
          Dirección:
          <input
            type="text"
            name="address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </label>

        <label>
          Latitud:
          <input
            type="number"
            step="any"
            name="latitude"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
        </label>

        <label>
          Longitud:
          <input
            type="number"
            step="any"
            name="longitude"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
        </label>

        <label>
          Teléfono:
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </label>

        <label>
          Rating:
          <input
            type="number"
            step="any"
            name="rating"
            value={rating}
            onChange={e => setRating(e.target.value)}
            min={0}
            max={5}
          />
        </label>

        <div>
          <button type="submit">Guardar cambios</button>
          <button onClick={() => navigate(`/restaurants/${restaurantId}`)}>Cancelar</button>
        </div>

      </form>
    </div>

  )
}

export default EditRestaurant