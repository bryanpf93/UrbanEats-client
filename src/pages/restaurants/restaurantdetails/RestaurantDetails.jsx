import "./RestaurantDetails.css"
import {
  Container,
  Image,
  Title,
  Text,
  Group,
  Card,
  Button,
  Box,
  Skeleton
} from "@mantine/core";
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ProductCard from "../../../components/restaurants/productcard/ProductCard"
import { AuthContext } from "../../../context/auth.context"
import RestaurantMap from "../../../components/map/RestaurantMap";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import SkeletonLoaderProductCard from "../../../components/loader/SkeletonLoaderProductCard";


const API_URL = import.meta.env.VITE_API_URL

function RestaurantDetails() {

  const [restaurant, setRestaurant] = useState({})
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const { restaurantId } = useParams()
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)
  const isAdmin = user?.role === "admin"

  const storedToken = localStorage.getItem("authToken")

  const getRestaurant = () => {
    return axios.get(
      `${API_URL}/api/restaurants/${restaurantId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    );
  };

  const getProductsFromRestaurant = () => {
    return axios.get(
      `${API_URL}/api/restaurants/${restaurantId}/products`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.log("Error getting products", err);
      });
  };

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
    Promise.all([
      getRestaurant(),
      getProductsFromRestaurant()
    ])
      .then(([restaurantRes]) => {
        setRestaurant(restaurantRes.data);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });

  }, [restaurantId]);



  const categories = [
    "Entrantes",
    "Platos principales",
    "Especialidades",
    "Acompañamientos",
    "Postres",
    "Bebidas"
  ];

  return (
    <>
      <Container size="xl" py="xl">

        {loading ? (
          <Skeleton height={400} radius="xl" mb="xl" />
        ) : (
          <Image
            src={restaurant.image}
            h={400}
            radius="xl"
            mb="xl"
          />
        )}

        {loading ? (
          <Card shadow="sm" padding="xl" radius="xl" withBorder>
            <Skeleton height={36} width="40%" />

            <Group mt="sm" justify="center">
              <Skeleton height={20} width={80} />
              <Skeleton height={20} width={100} />
            </Group>

            <Skeleton mt="md" height={20} width="60%" />
            <Skeleton mt="sm" height={20} width="40%" />

            <Skeleton mt="lg" height={18} width="100%" />
            <Skeleton mt="sm" height={18} width="80%" />
          </Card>
        ) : (
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
        )}

      </Container>

      <Container size="xl" mb="lg">

        {loading ? (
          <>
            <Skeleton height={32} width={140} mb="lg" />
            <Skeleton height={300} radius="xl" />
          </>
        ) : (
          <>
            <Title order={2} mb="lg">
              Ubicación
            </Title>

            <Card shadow="sm" radius="xl" withBorder padding="md">
              <RestaurantMap restaurant={restaurant} />
            </Card>
          </>
        )}

      </Container>

      <Container size="xl" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",

      }}>

        {loading ? (
          <Skeleton
            height={36}
            width={140}
            radius="md"
            mb="md"
          />
        ) : (
          isAdmin && (
            <Button
              color="orange"
              component={Link}
              to={`/admin/restaurants/${restaurantId}/products/new`}
            >
              Crear producto
            </Button>
          )
        )}
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

              {loading ? (
                <Skeleton height={36} width={320} mx="auto" mb="xl" />
              ) : (
                <Title
                  mt="xl"
                  mb="xl"
                  order={2}
                  ta="center"
                >
                  {category}
                </Title>
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
                    <SkeletonLoaderProductCard key={index} />
                  ))
                  : filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      refreshProducts={getProductsFromRestaurant}
                    />
                  ))
                }
              </Box>
            </div>
          )
        })}

      </Container>

    </>
  )
}

export default RestaurantDetails