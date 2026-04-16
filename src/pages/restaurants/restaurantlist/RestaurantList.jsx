import "./RestaurantList.css"
import {
  Container,
  Title,
  Text,
  Grid,
  Button,
  TextInput,
  Group,
  SimpleGrid,
  Box,
  Skeleton
} from "@mantine/core";

import axios from "axios"
import { useEffect, useState } from "react"
import RestaurantCard from "../../../components/restaurants/restaurantcard/RestaurantCard"
import RestaurantCarousel from "../../../components/restaurants/carousel/RestaurantCarousel";
import RestaurantCardSkeleton from "../../../components/loader/SkeletonLoader";
import RestaurantCarouselSkeleton from "../../../components/loader/SkeletonLoaderCarousel";
import ProductCardSkeleton from "../../../components/loader/SkeletonLoaderProductCard";


const API_URL = import.meta.env.VITE_API_URL

function RestaurantList() {

  const [restaurants, setRestaurants] = useState([])
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [loading, setLoading] = useState(true)

  const getAllRestaurants = () => {

    const storedToken = localStorage.getItem("authToken")

    axios
      .get(
        `${API_URL}/api/restaurants`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {

        const fixedRestaurants = response.data.slice(0, 18);
        const newRestaurants = response.data.slice(18).reverse();

        setRestaurants([
          ...newRestaurants,
          ...fixedRestaurants
        ]);

      })
      .catch((err) => {
        console.log("Error getting projects from DB", err)
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      })
  }

  useEffect(() => {
    getAllRestaurants()
  }, [])

  const filteredRestaurants = restaurants.filter((restaurant) => {

    const matchesSearch =
      restaurant.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "Todos" ||
      restaurant.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ["Todos", "Italiana", "Hamburguesas", "Japonesa", "Española", "Mexicana", "Peruana"]


  if (restaurants === null) {
    return <h1>Loading ....</h1>
  }

  console.log(restaurants)


  return (
    <Container
      size="xl"
      py="xl"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%"
      }}
    >

      {loading ? (
        <Skeleton height={36} width={320} mx="auto" mb="xl" />
      ) : (
        <Title mb="xl" ta="center">
          Explora los mejores restaurantes
        </Title>
      )}

      {loading ? (
        <Skeleton height={52} width="70%" mx="auto" mb="xl" radius="xl" />
      ) : (
        <TextInput
          w="70%"
          mx="auto"
          placeholder="Busca tu restaurante favorito..."
          size="lg"
          radius="xl"
          mb="xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {loading ? (
        <Group justify="center" mb="xl">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} height={36} width={100} radius="xl" />
          ))}
        </Group>
      ) : (
        <Group justify="center" mb="xl">
          {categories.map((category) => (
            <Button
              key={category}
              radius="xl"
              variant={selectedCategory === category ? "filled" : "light"}
              color="orange"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </Group>
      )}

      {search === "" && selectedCategory === "Todos" && (
        <>
          {loading ? (
            <Skeleton height={36} width={320} mx="auto" mb="xl" />
          ) : (
            <Title order={2} mb="xl" ta="center">
              ⭐ Mejor valorados
            </Title>
          )}


          {loading ? (
            <RestaurantCarouselSkeleton />
          ) : (
            <RestaurantCarousel restaurants={restaurants} />
          )}


          {loading ? (
            <Skeleton mt="xl" height={36} width={320} mx="auto" mb="xl" />
          ) : (
            <Title order={2} mt="xl" mb="xl" ta="center">
              Todos los restaurantes
            </Title>
          )}

        </>
      )}

      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 410px))",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
          : filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
            />
          ))
        }
      </Box>

    </Container>
  )
}

export default RestaurantList