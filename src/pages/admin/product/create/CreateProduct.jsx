import { useNavigate, useParams } from "react-router-dom"
import "./CreateProduct.css"
import { useState } from "react"
import axios from "axios"
import {
  Container,
  Card,
  Title,
  TextInput,
  Select,
  Textarea,
  Button,
  Group
} from "@mantine/core";

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
  <Container size="sm" py="xl">

    <Title mb="xl">
      Crear nuevo producto
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

        <TextInput
          label="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
            Crear producto
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

export default CreateProduct