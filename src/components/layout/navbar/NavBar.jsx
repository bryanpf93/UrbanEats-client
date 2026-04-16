import { useContext } from "react";
import { AuthContext } from "../../../context/auth.context";
import { Link } from "react-router-dom";
import { Anchor, Button, Group } from "@mantine/core";



function NavBar() {


  return (
    <>

      <Group gap="xl" visibleFrom="sm">
        <Anchor component={Link} to="/" c="dark" fw={500}>Inicio</Anchor>
        <Anchor component={Link} to="/restaurants" c="dark" fw={500}>Restaurantes</Anchor>
        <Anchor component={Link} to="/about" c="dark" fw={500}>Conócenos</Anchor>
      </Group>


    </>
  );
}

export default NavBar