import {
  Container,
  Title,
  Text,
  Card,
  Grid
} from "@mantine/core";

function About() {
  return (
    <Container size="xl" py="xl">

      <Title ta="center" mb="xl">
        Sobre UrbanEats
      </Title>

      <Text ta="center" size="lg" c="dimmed" mb="xl">
        UrbanEats conecta a los amantes de la comida con los mejores
        restaurantes de su ciudad, ofreciendo una experiencia rápida,
        cómoda y moderna para descubrir y pedir tus platos favoritos.
      </Text>

      <Grid gutter="xl">

        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg" radius="xl" withBorder>
            <Title order={3} mb="sm">
              🍽️ Variedad
            </Title>

            <Text>
              Explora restaurantes de distintas categorías y descubre
              nuevos sabores cerca de ti.
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg" radius="xl" withBorder>
            <Title order={3} mb="sm">
              ⚡ Rapidez
            </Title>

            <Text>
              Haz tus pedidos en pocos clics y disfruta de una
              experiencia ágil e intuitiva.
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg" radius="xl" withBorder>
            <Title order={3} mb="sm">
              ❤️ Calidad
            </Title>

            <Text>
              Trabajamos con restaurantes mejor valorados para
              garantizar la mejor experiencia gastronómica.
            </Text>
          </Card>
        </Grid.Col>

      </Grid>

      <Card
        mt="xl"
        padding="xl"
        radius="xl"
        withBorder
        shadow="sm"
      >
        <Title order={2} mb="md">
          Nuestra misión
        </Title>

        <Text size="lg">
          En UrbanEats creemos que pedir comida debería ser tan
          agradable como disfrutarla. Nuestra misión es ofrecer una
          plataforma intuitiva, moderna y eficiente que conecte a
          usuarios con restaurantes increíbles.
        </Text>
      </Card>

    </Container>
  );
}

export default About;