import { Container, Group, Button, Image, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo-header.png";
import NavBar from "../navbar/NavBar";
import UserMenu from "../user/UserMenu";
import ThemeToggle from "../../theme/ThemeToggle";
import BurgerMenu from "../burgermenu/BurgerMenu";

function Header() {
  return (
    <header
      style={{
        backgroundColor: "#fff7ed",
        borderBottom: "1px solid #eee",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        overflow: "visible"
      }}
    >
      <Container size="xl" py="lg" style={{
        overflow: "visible"
      }}
      >

        <Group justify="space-between" align="center">

          <Link to="/">
            <Image
              src={logo}
              alt="UrbanEats"
              h={50}
              fit="contain"
            />
          </Link>

          <>
            <NavBar />
            <BurgerMenu />
          </>

          <Group gap="md">

            <ThemeToggle />
            <UserMenu />

          </Group>

        </Group>

      </Container>
    </header>
  );
}

export default Header;