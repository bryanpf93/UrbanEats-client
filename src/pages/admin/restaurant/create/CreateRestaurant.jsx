import { useState } from "react"
import "./CreateRestaurant.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function CreateRestaurant() {

  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [category, setCategory] = useState("Otro")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [phone, setPhone] = useState("")
  const [rating, setRating] = useState(0)

  

  const handleSubmit = e => {
    e.preventDefault()

    const newRestaurant = {
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

    const storedToken = localStorage.getItem("authToken")

    axios
      .post(
        `${API_URL}/api/restaurants`,
        newRestaurant,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate("/restaurants")
        console.log(response.data)
      })
      .catch((err) => {
        console.log("Error creating new reataurant", err)
      })

  }


  return (

    <div className="form-new-restaurant">
      <h1>Crear nuevo restaurante</h1>
      <form onSubmit={handleSubmit}>

        
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={15}
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
            name="rating"
            value={rating}
            onChange={e => setRating(e.target.value)}
            min={0}
            max={5}
          />
        </label>
        <div>
          <button type="submit">Crear restaurante</button>
          <button onClick={() => navigate("/restaurants")}>Cancelar</button>
        </div>


      </form>

    </div>
  )
}

export default CreateRestaurant