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
        padding: "3rem 0 5rem 0",
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
          mb="4rem"
        >
          Pedir tu comida favorita nunca fue tan fácil.
        </Text>


        <Grid>

          <Grid.Col span={4}>
            <Card
              shadow="md"
              padding="xl"
              radius="lg"
              withBorder
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


          <Grid.Col span={4}>
            <Card
              shadow="md"
              padding="xl"
              radius="lg"
              withBorder
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


          <Grid.Col span={4}>
            <Card
              shadow="md"
              padding="xl"
              radius="lg"
              withBorder
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