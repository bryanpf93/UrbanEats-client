import { useState } from "react"
import "./CreateRestaurant.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
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


  const handleGetCoordinates = () => {

    if (!address) return;

    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`,
        {
          params: {
            access_token: import.meta.env.VITE_MAPBOX_TOKEN,
            limit: 1
          }
        }
      )
      .then((response) => {

        if (!response.data.features.length) {
          alert("Dirección no encontrada");
          return;
        }

        const coordinates = response.data.features[0].center;

        setLatitude(coordinates[0]);
        setLongitude(coordinates[1])

      })
      .catch((err) => {
        console.log("Error getting coordinates", err);
      });

  }


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

    <Container size="sm" py="xl">

      <Title mb="xl">
        Crear nuevo restaurante
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

          <Button
            mb="sm"
            color="dark"
            onClick={handleGetCoordinates}
          >
            Obtener coordenadas automáticamente
          </Button>

          <TextInput
            label="Latitud"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            mb="md"
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
            mb="md"
            styles={{
              label: {
                color: "white",
                fontSize: "1.2rem"
              }
            }}
          />

          <TextInput
            label="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            <Button color="dark" type="submit">
              Crear restaurante
            </Button>

            <Button
              variant="light"
              color="gray"
              onClick={() => navigate("/restaurants")}
            >
              Cancelar
            </Button>
          </Group>

        </form>
      </Card>

    </Container>
  )
}

export default CreateRestaurant