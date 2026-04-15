import { useNavigate, useParams } from "react-router-dom"
import "./EditProduct.css"
import axios from "axios"
import { useEffect, useState } from "react"
import {
  Container,
  Card,
  Title,
  TextInput,
  Textarea,
  Select,
  Button,
  Group,
  NumberInput
} from "@mantine/core";

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
  <Container size="sm" py="xl">

    <Title mb="xl">
      Editar producto
    </Title>

    <Card
      shadow="sm"
      padding="xl"
      radius="xl"
      withBorder
      bg="orange"
    >
      <form onSubmit={handleSubmit}>

        <TextInput
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          mb="md"
          styles={{
              label: {
                color: "white",
                fontSize: "1.2rem"
              }
            }}
        />

        <NumberInput
          label="Precio"
          value={price}
          onChange={setPrice}
          min={1}
          max={999}
          mb="md"
          styles={{
              label: {
                color: "white",
                fontSize: "1.2rem"
              }
            }}
        />

        <Textarea
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          mb="md"
          styles={{
              label: {
                color: "white",
                fontSize: "1.2rem"
              }
            }}
        />

        <TextInput
          label="Imagen"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          mb="md"
          styles={{
              label: {
                color: "white",
                fontSize: "1.2rem"
              }
            }}
        />

        <Select
          label="Categoría"
          value={category}
          onChange={setCategory}
          data={[
            "Otro",
            "Entrantes",
            "Platos principales",
            "Especialidades",
            "Acompañamientos",
            "Postres",
            "Bebidas"
          ]}
          mb="lg"
          styles={{
              label: {
                color: "white",
                fontSize: "1.2rem"
              }
            }}
        />

        <Group justify="space-between">

          <Button type="submit" color="dark">
            Guardar cambios
          </Button>

          <Button
            variant="light"
            color="gray"
            onClick={() => navigate(`/restaurants/${restaurantId}`)}
          >
            Cancelar
          </Button>

        </Group>

      </form>
    </Card>

  </Container>
)
}

export default EditProduct