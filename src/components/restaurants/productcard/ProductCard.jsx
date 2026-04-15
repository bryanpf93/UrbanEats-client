import { useContext } from "react"
import "./ProductCard.css"
import { CartContext } from "../../../context/cart.context"
import { AuthContext } from "../../../context/auth.context"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { IconShoppingCart } from "@tabler/icons-react"
import { Button, Card, Group, Image, Text, Title } from "@mantine/core"

const API_URL = import.meta.env.VITE_API_URL

function ProductCard({ product, refreshProducts }) {

  console.log(product)
  const { addToCart, reloadCart } = useContext(CartContext)
  const { isLoggedIn, user } = useContext(AuthContext)
  const navigate = useNavigate()

  const isAdmin = user?.role === "admin"

  function handleAddToCart() {
    if (!isLoggedIn) {
      navigate("/login")
      return
    }

    addToCart(product)
  }

  const handleDelete = () => {
    const storedToken = localStorage.getItem("authToken")
    axios
      .delete(
        `${API_URL}/api/products/${product._id}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => {
        refreshProducts()
        reloadCart()
        navigate(`/restaurants/${product.restaurant}`)
      })
      .catch((err) => {
        console.log("Error deleting product", err)
      })
  }

  return (

    <Card
  
      shadow="md"
      padding="lg"
      radius="xl"
      withBorder
      className="product-card"
      style={{
        textDecoration: "none"
      }}
    >
      <Card.Section>
        <Image
          src={product.image}
          h={280}
          alt={product.name}
        />
      </Card.Section>


      <Title
        order={4}
        mt="lg"
        c="dark"
        size="xl"
      >
        {product.name}
      </Title>


      <Text
        c="dimmed"
        size="md"
      >
        {product.category}
      </Text>

      <Text
        size="lg"
      >
        {product.description}
      </Text>

      <Group style={{
        display: "flex",
        justifyContent: "center",
        margin: "20px 0",

      }}>

        <Text
          size="lg"
        >
          <strong>Precio: </strong> {product.price} €
        </Text>

        <Button color="gray" onClick={handleAddToCart}>Añadir<IconShoppingCart style={{ marginLeft: "8px" }} size={18} /></Button>
      </Group>

      {isAdmin && (
        <Group style={{
          display:"flex",
          justifyContent: "center"
        }}>
          <Button color="orange" component={Link} to={`/admin/restaurants/${product.restaurant}/products/${product._id}/edit`}>Editar</Button>
          <Button color="red" onClick={handleDelete}>Borrar</Button>
        </Group>
      )}

    </Card>

    




    // <div className="product-container">
    //   <img src={product.image} alt={product.name} />
    //   <p>{product.name}</p>
    //   <p>{product.description}</p>
    //   <p>Price: {product.price}</p>
    //   <button onClick={handleAddToCart}>
    //     Añadir al carrito 🛒
    //   </button>

    //   {isAdmin && (
    //     <>
    //       <Link to={`/admin/restaurants/${product.restaurant}/products/${product._id}/edit`}>
    //         <button>Editar</button>
    //       </Link>
    //       <button onClick={handleDelete}>Borrar</button>
    //     </>
    //   )}


    // product
  )
}

export default ProductCard