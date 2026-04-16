import {
  Container,
  Title,
  Text,
  Grid,
  Card
} from "@mantine/core";
import { IconSearch, IconShoppingCart, IconTruckDelivery } from "@tabler/icons-react";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme.context";


function HowItWorks() {

  const { colorScheme } = useContext(ThemeContext);


  return (
    <section
      style={{
        padding: "3rem 0",
        backgroundColor:
          colorScheme === "dark"
            ? "#1a1b1e"
            : "white"
      }}
    >
      <Container size="xl">

        <Title
          ta="center"
          mb="sm"
          fw={800}
          c="var(--mantine-color-text)"
        >
          ¿Cómo funciona UrbanEats?
        </Title>

        <Text
          ta="center"
          c="var(--mantine-color-text)"
          mb="2rem"
        >
          Pedir tu comida favorita nunca fue tan fácil.
        </Text>


        <Grid justify="center">

          <Grid.Col
            span={{ base: 12, sm: 6, lg: 4 }}
            style={{ display: "flex" }}
          >
            <Card
              shadow="md"
              padding="xl"
              radius="lg"
              withBorder
              h="100%"
              style={{ flex: 1 }}
            >
              <IconSearch
                size={40}
                color="#f97316"
              />

              <Title order={4} mt="md">
                Explora Restaurantes
              </Title>

              <Text c="dimmed" mt="sm">
                Descubre los mejores restaurantes disponibles en tu zona.
              </Text>
            </Card>
          </Grid.Col>


          <Grid.Col
            span={{ base: 12, sm: 6, lg: 4 }}
            style={{ display: "flex" }}
          >
            <Card
              shadow="md"
              padding="xl"
              radius="lg"
              withBorder
              h="100%"
              style={{ flex: 1 }}
            >
              <IconShoppingCart
                size={40}
                color="#f97316"
              />

              <Title order={4} mt="md">
                Haz tu Pedido
              </Title>

              <Text c="dimmed" mt="sm">
                Añade tus platos favoritos al carrito y realiza tu pedido fácilmente.
              </Text>
            </Card>
          </Grid.Col>


          <Grid.Col
            span={{ base: 12, sm: 6, lg: 4 }}
            style={{ display: "flex" }}
          >
            <Card
              shadow="md"
              padding="xl"
              radius="lg"
              withBorder
              h="100%"
              style={{ flex: 1 }}
            >
              <IconTruckDelivery
                size={40}
                color="#f97316"
              />

              <Title order={4} mt="md">
                Recíbelo Rápido
              </Title>

              <Text c="dimmed" mt="sm">
                Tu comida llegará caliente y rápida directamente a tu puerta.
              </Text>
            </Card>
          </Grid.Col>

        </Grid>

      </Container>
    </section>
  );
}

export default HowItWorks;