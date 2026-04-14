import { useNavigate, useParams } from "react-router-dom"
import "./EditProduct.css"
import axios from "axios"
import { useEffect, useState } from "react"

function EditProduct() {

  const API_URL = import.meta.env.VITE_API_URL
  const { restaurantId, productId } = useParams()
  const navigate = useNavigate()
  const storedToken = localStorage.getItem("authToken")

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("Otro")

  const getProduct = () => {

    axios
      .get(
        `${API_URL}/api/products/${productId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneProduct = response.data
        setName(oneProduct.name)
        setDescription(oneProduct.description)
        setPrice(oneProduct.price)
        setImage(oneProduct.image)
        setCategory(oneProduct.category)
      })
      .catch((err) => {
        console.log("Error getting product ", err)
      })
  }

  useEffect(() => {
    getProduct()
  }, [])


  const handleSubmit = e => {
    e.preventDefault()

    const newDetails = {
      name,
      description,
      price,
      image,
      category
    }

    axios
      .put(
        `${API_URL}/api/products/${productId}`,
        newDetails,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate(`/restaurants/${restaurantId}`)
      })
      .catch((err) => {
        console.log("Error updating product", err)
      })
  }

  return (

    <div className="form-edit-product">
      <h2>Editar producto</h2>

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
          <button type="submit">Guardar cambios</button>
          <button onClick={() => navigate(`/restaurants/${restaurantId}`)}>Cancelar</button>
        </div>

      </form>
    </div>
  )
}

export default EditProduct