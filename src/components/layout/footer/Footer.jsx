import { Container, Group, Text, Anchor, Divider, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png"

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#111",
        color: "white",
        paddingTop: "3rem",
        paddingBottom: "1rem"
      }}
    >
      <Container size="xl">

        <Group justify="space-evenly" align="flex-start">

          {/* BRAND */}
          <div>
            <Link to="/">
                        <Image
                          src={logo}
                          alt="UrbanEats"
                          h={100}
                          fit="contain"
                        />
                      </Link>
            <Text size="sm" c="dimmed" mt="sm">
              Tu comida favorita, entregada rápido.
            </Text>
          </div>

          {/* LINKS */}
          <div>
            <Text fw={600} mb="sm">Navegación</Text>

            <Anchor component={Link} to="/" c="gray">Inicio</Anchor><br />
            <Anchor component={Link} to="/restaurants" c="gray">Restaurantes</Anchor><br />
            <Anchor component={Link} to="/about" c="gray">Conócenos</Anchor>
          </div>

          {/* CONTACT */}
          <div>
            <Text fw={600} mb="sm">Contacto</Text>

            <Text size="sm" c="dimmed">bryanpf93@gmail.com</Text>
            <Text size="sm" c="dimmed">+34 607 209 707</Text>
          </div>

        </Group>

        <Divider my="sm" color="gray" />

        <Text ta="center" size="sm" c="dimmed">
          © 2026 UrbanEats. Todos los derechos reservados.
        </Text>

      </Container>
    </footer>
  );
}

export default Footer;