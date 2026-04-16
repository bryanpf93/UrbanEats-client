import {
  Container,
  Title,
  Text,
  Grid,
  Card
} from "@mantine/core";
import { IconSearch, IconShoppingCart, IconTruckDelivery } from "@tabler/icons-react";


function HowItWorks() {
  return (
    <section
      style={{
        padding: "3rem 0",
        backgroundColor: "white"
      }}
    >
      <Container size="xl">

        <Title
          ta="center"
          mb="sm"
          fw={800}
        >
          ¿Cómo funciona UrbanEats?
        </Title>

        <Text
          ta="center"
          c="dimmed"
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