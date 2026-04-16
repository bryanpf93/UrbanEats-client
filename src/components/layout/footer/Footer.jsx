import {
  Container,
  Flex,
  Group,
  Text,
  Anchor,
  Divider,
  Image,
  Stack
} from "@mantine/core";

import {
  IconBrandLinkedin,
  IconBrandGithub
} from "@tabler/icons-react";

import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#111",
        color: "white",
        paddingTop: "3rem",
        paddingBottom: "1rem",
        marginTop: "30px"
      }}
    >
      <Container size="xl">

        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="space-evenly"
          align={{ base: "center", sm: "flex-start" }}
          gap="xl"
        >

          {/* LOGO */}
          <Stack align="center" gap={4}>
            <Link to="/">
              <Image
                src={logo}
                alt="UrbanEats"
                h={80}
                fit="contain"
              />
            </Link>

            <Text size="sm" c="dimmed" ta="center">
              Tu comida favorita, entregada rápido.
            </Text>
          </Stack>


          {/* BLOQUE LINKS + CONTACTO */}
          <Group gap="4rem">

            <Stack gap={4}>
              <Text fw={600}>Navegación</Text>

              <Anchor component={Link} to="/" c="gray">
                Inicio
              </Anchor>

              <Anchor component={Link} to="/restaurants" c="gray">
                Restaurantes
              </Anchor>

              <Anchor component={Link} to="/about" c="gray">
                Conócenos
              </Anchor>
            </Stack>


            <Stack gap={4}>
              <Text fw={600}>Contacto</Text>

              <Text size="sm" c="dimmed">
                bryanpf93@gmail.com
              </Text>

              <Anchor
                href="https://www.linkedin.com/in/bryanpf93/"
                target="_blank"
                c="dimmed"
              >
                <IconBrandLinkedin size="1rem" /> LinkedIn
              </Anchor>

              <Anchor
                href="https://github.com/bryanpf93"
                target="_blank"
                c="dimmed"
              >
                <IconBrandGithub size="1rem" /> GitHub
              </Anchor>
            </Stack>

          </Group>

        </Flex>

        <Divider mb="md" mt="xl" color="gray" />

        <Text ta="center" size="sm" c="dimmed">
          © 2026 UrbanEats. Todos los derechos reservados.
        </Text>

      </Container>
    </footer>
  );
}

export default Footer;