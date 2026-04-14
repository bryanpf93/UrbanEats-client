import { useContext } from "react";
import { AuthContext } from "../../../context/auth.context";
import { Link } from "react-router-dom";
import { Anchor, Button, Group } from "@mantine/core";



function NavBar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
  const isAdmin = user?.role === "admin"

  return (
    <>

      <Group gap="xl">

        {isAdmin && <Anchor component={Link} to="/admin/restaurants/new" c="dark" fw={500}>Crear</Anchor>}
          <>
            <Anchor component={Link} to="/" c="dark" fw={500}>Home</Anchor>
            <Anchor component={Link} to="/restaurants" c="dark" fw={500}>Restaurantes</Anchor>          
            <Anchor component={Link} to="/about" c="dark" fw={500}>About</Anchor>
          </>
      </Group>

      <Group>

        {isLoggedIn && (
          <>
            <Button onClick={logOutUser} variant="subtle" color="orange">Logout</Button>
            <Button variant="subtle" color="orange" component={Link} to="/orders">Mis Pedidos</Button>
            <Button variant="subtle" color="orange" component={Link} to="/cart">🛒</Button>
            
          </>
        )}

        {!isLoggedIn && (
          <>
            <Button variant="subtle" color="orange" component={Link} to="/login">Login</Button>
            <Button color="orange" radius="md" component={Link} to="/signup">Sign Up</Button>
            
          </>
        )}

      </Group>

      {/* {isAdmin && (
        <>
          <Link to="/admin/restaurants/new"><button>Crear</button></Link>
        </>
      )}

      {isLoggedIn && (
        <>
          <Link to="/restaurants"><button>Restaurants</button></Link>
          <Link to="/cart"><button>Cart</button></Link>
          <Link to="/orders"><button>Orders</button></Link>

          <button onClick={logOutUser}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/"><button>Home</button></Link>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )} */}
    </>
  );
}

export default NavBar