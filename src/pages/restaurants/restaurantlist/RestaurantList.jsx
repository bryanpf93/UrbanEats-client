import "./RestaurantList.css"
import {
  Container,
  Title,
  Text,
  Grid,
  Button,
  TextInput,
  Group
} from "@mantine/core";

import axios from "axios"
import { useEffect, useState } from "react"
import RestaurantCard from "../../../components/restaurants/restaurantcard/RestaurantCard"
import RestaurantCarousel from "../../../components/restaurants/carousel/RestaurantCarousel";


const API_URL = import.meta.env.VITE_API_URL

function RestaurantList() {

  const [restaurants, setRestaurants] = useState(null)

  const getAllRestaurants = () => {

    const storedToken = localStorage.getItem("authToken")

    axios
      .get(
        `${API_URL}/api/restaurants`,
        { headers: { Authorization: `Bearer ${storedToken}` } })
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

  if (restaurants === null) {
    return <h1>Loading ....</h1>
  }

  console.log(restaurants)


  return (
    <Container 
    style={{
      display:"flex",
      flexDirection:"column",
      justifyContent: "center",
      alignItems: "center"
    }}
    
    size="xl" py="xl">

      <Title mb="xl">
        Explora los mejores restaurantes
      </Title>


      <TextInput
        style={{
          width:"70%"

        }}
        placeholder="Busca tu restaurante favorito..."
        size="lg"
        radius="xl"
        mb="xl"
      />


      <Group style={{
        display: "flex",
        justifyContent: "center"
      }} mb="xs">

        <Button variant="light" radius="xl">Todos</Button>
        <Button variant="light" radius="xl">Italiano</Button>
        <Button variant="light" radius="xl">Burger</Button>
        <Button variant="light" radius="xl">Japonsa</Button>
        <Button variant="light" radius="xl">Española</Button>
        <Button variant="light" radius="xl">Mexicana</Button>
        <Button variant="light" radius="xl">Peruana</Button>

      </Group>


      <Title order={2} mt="xl" mb="xl">
        ⭐ Mejor valorados
      </Title>

      <RestaurantCarousel restaurants={restaurants} />


      <Title order={2} mt="xl" mb="xl">
        Todos los restaurantes
      </Title>


      <Grid gutter="xl">

        {restaurants.map((restaurant) => (
          <Grid.Col
            key={restaurant._id}
            span={4}
          >
            <RestaurantCard restaurant={restaurant} />
          </Grid.Col>
        ))}

      </Grid>


    </Container>

  )
}

export default RestaurantList