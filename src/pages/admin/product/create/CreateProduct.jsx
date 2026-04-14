import { useNavigate, useParams } from "react-router-dom"
import "./CreateProduct.css"
import { useState } from "react"
import axios from "axios"

function CreateProduct() {

  const API_URL = import.meta.env.VITE_API_URL

  const { restaurantId } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("Otro")

  const handleSubmit = e => {
    e.preventDefault()

    const newProduct = {
      name,
      description,
      price,
      image,
      category,
      restaurant: restaurantId
    }

    const storedToken = localStorage.getItem("authToken")

    axios
      .post(
        `${API_URL}/api/restaurants/${restaurantId}/products`,
        newProduct,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate(`/restaurants/${restaurantId}`)
      })
      .catch((err) => {
        console.log("Error creating product", err)
      })
  }

  return (

    <div className="form-new-product">
      <h2>Crear nuevo producto</h2>

      <form onSubmit={handleSubmit}>

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
          Precio:
          <input
            type="number"
            name="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            min={1}
            max={999}
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
          Imagen:
          <input
            type="text"
            name="image"
            value={image}
            onChange={e => setImage(e.target.value)}
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
            <option value="Entrantes">Entrante</option>
            <option value="Platos principales">Platos principales</option>
            <option value="Especialidades">Especialidades</option>
            <option value="Acompañamientos">Acompañamientos</option>
            <option value="Postres">Postres</option>
            <option value="Bebidas">Bebidas</option>
          </select>
        </label>

        <div>
          <button type="submit">Crear producto</button>
          <button onClick={() => navigate(`/restaurants/${restaurantId}`)}>Cancelar</button>
        </div>
        

      </form>
    </div>

  )
}

export default CreateProduct