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
        <Anchor component={Link} to="/" c="dark" fw={500}>Home</Anchor>
        <Anchor component={Link} to="/restaurants" c="dark" fw={500}>Restaurantes</Anchor>
        <Anchor component={Link} to="/about" c="dark" fw={500}>About</Anchor>
      </Group>


    </>
  );
}

export default NavBar