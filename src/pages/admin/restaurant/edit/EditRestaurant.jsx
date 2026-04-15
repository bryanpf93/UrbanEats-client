import { useNavigate, useParams } from "react-router-dom"
import "./EditRestaurant.css"
import { useEffect, useState } from "react"
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
    <Container size="sm" py="xl">

    <Title mb="xl">
      Editar restaurante
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

        <Select
          label="Categoría"
          value={category}
          onChange={setCategory}
          data={[
            "Otro",
            "Italiana",
            "Japonesa",
            "Mexicana",
            "Española",
            "Hamburguesas",
            "Peruana"
          ]}
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
          label="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          mb="md"
          styles={{
              label: {
                color: "white",
                fontSize: "1.2rem"
              }
            }}
        />

        <Group grow>
          <TextInput
            label="Latitud"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            styles={{
              label: {
                color: "white",
                fontSize: "1.2rem"
              }
            }}
          />

          <TextInput
            label="Longitud"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            styles={{
              label: {
                color: "white",
                fontSize: "1.2rem"
              }
            }}
          />
        </Group>

        <TextInput
          label="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          mt="md"
          mb="md"
          styles={{
              label: {
                color: "white",
                fontSize: "1.2rem"
              }
            }}
        />

        <TextInput
          label="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
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

export default EditRestaurant