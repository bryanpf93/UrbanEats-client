import "./RestaurantDetails.css"
import {
  Container,
  Image,
  Title,
  Text,
  Group,
  Card,
  Button,
  Grid
} from "@mantine/core";
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ProductCard from "../../../components/restaurants/productcard/ProductCard"
import { AuthContext } from "../../../context/auth.context"
import RestaurantMap from "../../../components/map/RestaurantMap";
import ConfirmModal from "../../../components/modals/ConfirmModal";


const API_URL = import.meta.env.VITE_API_URL

function RestaurantDetails() {

  const [restaurant, setRestaurant] = useState(null)
  const [products, setProducts] = useState(null)

  const { restaurantId } = useParams()
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)
  const isAdmin = user?.role === "admin"

  const storedToken = localStorage.getItem("authToken")

  const getRestaurant = () => {

    axios
      .get(
        `${API_URL}/api/restaurants/${restaurantId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setRestaurant(response.data)
      })
      .catch((err) => {
        console.log("Error getting restaurant", err)
      })
  }

  const getProductsFromRestaurant = () => {

    axios
      .get(
        `${API_URL}/api/restaurants/${restaurantId}/products`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setProducts(response.data)
      })
      .catch((err) => {
        console.log("Error getting products from restaurant", err)
      })
  }

  const handleDelete = () => {

    axios
      .delete(
        `${API_URL}/api/restaurants/${restaurantId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate("/restaurants")
        console.log(response.data)
      })
      .catch((err) => {
        console.log("Error deleting restaurant", err)
      })


  }

  const confirmDeleteRestaurant = () => {
    ConfirmModal({
      title: "Eliminar restaurante",

      message:
        "¿Seguro que quieres eliminar este restaurante?",

      confirmText: "Eliminar",

      onConfirm: handleDelete,
    });
  };


  useEffect(() => {
    getRestaurant()
    getProductsFromRestaurant()
  }, [restaurantId])

  const categories = [
    "Entrantes",
    "Platos principales",
    "Especialidades",
    "Acompañamientos",
    "Postres",
    "Bebidas"
  ];

  if (restaurant === null) {
    return <h1>Loading ...</h1>
  }

  if (products === null) {
    return <h1>Loading ...</h1>
  }

  return (
    <>
      <Container size="xl" py="xl">

        <Image
          src={restaurant.image}
          h={400}
          radius="xl"
          mb="xl"
        />

        <Card
          shadow="sm"
          padding="xl"
          radius="xl"
          withBorder
        >
          <Title order={1}>
            {restaurant.name}
          </Title>

          <Group mt="sm" justify="center">
            <Text fw={500}>
              ⭐ {restaurant.rating}
            </Text>

            <Text fw={500}>
              {restaurant.category}
            </Text>
          </Group>

          <Text mt="md">
            📍 {restaurant.address}
          </Text>

          <Text>
            📞 {restaurant.phone}
          </Text>

          <Text mt="lg" c="dimmed">
            {restaurant.description}
          </Text>

          {isAdmin && (
            <>
              <Group mt="xl" justify="center">
                <Button color="orange" component={Link} to={`/admin/restaurants/${restaurantId}/edit`} > Editar</Button>
                <Button color="red" onClick={confirmDeleteRestaurant}>Borrar</Button>
              </Group>
            </>
          )}
        </Card>

      </Container>

      <Container size="xl" mb="lg">

        <Title order={2} mb="lg">
          Ubicación
        </Title>

        <Card
          shadow="sm"
          radius="xl"
          withBorder
          padding="md"
        >
          <RestaurantMap restaurant={restaurant} />
        </Card>

      </Container>

      <Container size="xl" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",

      }}>

        {isAdmin && <Button color="orange" component={Link} to={`/admin/restaurants/${restaurantId}/products/new`}>Crear producto</Button>}

        {categories.map((category) => {

          const filteredProducts = products.filter(
            (product) => product.category === category
          );

          if (filteredProducts.length === 0) return null;

          return (
            <div
              key={category}
              style={{ width: "100%" }}
            >
              <Title
                mt="xl"
                mb="xl"
                order={2}
                ta="left"
              >
                {category}
              </Title>

              <Grid gutter="xl">
                {filteredProducts.map((product) => (
                  <Grid.Col
                    key={product._id}
                    span={4}
                  >
                    <ProductCard
                      product={product}
                      refreshProducts={getProductsFromRestaurant}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </div>
          )
        })}

      </Container>

    </>
  )
}

export default RestaurantDetails