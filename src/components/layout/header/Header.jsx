import { Container, Group, Button, Image, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo-header.png";
import NavBar from "../navbar/NavBar";

function Header() {
  return (
    <header
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid #eee",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >
      <Container size="xl" py="lg">

        <Group justify="space-between">

          {/* LOGO */}
          <Link to="/">
            <Image
              src={logo}
              alt="UrbanEats"
              h={50}
              fit="contain"
            />
          </Link>

          <NavBar />



          {/* NAV LINKS */}
          
          {/* <Group gap="xl">

            <Anchor component={Link} to="/" c="dark" fw={500}>Home</Anchor>
            <Anchor component={Link} to="/restaurants" c="dark" fw={500}>Restaurantes</Anchor>
            <Anchor component={Link} to="/about" c="dark" fw={500}>About</Anchor>

          </Group> */}


          {/* AUTH BUTTONS */}
          {/* <Group>

            <Button
              variant="subtle"
              color="dark"
            >
              Login
            </Button>

            <Button
              color="orange"
              radius="md"
            >
              Register
            </Button>

          </Group> */}

        </Group>

      </Container>
    </header>
  );
}

export default Header;