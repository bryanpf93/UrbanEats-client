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
            <Title order={4} mb="md">
              🍽️ Variedad
            </Title>

            <Text c="dimmed" mt="sm">
              Explora restaurantes de distintas categorías y descubre
              nuevos sabores cerca de ti.
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
            <Title order={4} mb="md">
              ⚡ Rapidez
            </Title>

            <Text c="dimmed" mt="sm">
              Haz tus pedidos en pocos clics y disfruta de una
              experiencia ágil e intuitiva.
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
          <Card
            shadow="md"
            padding="xl"
            radius="lg"
            withBorder
            h="100%"
            style={{ flex: 1 }}
          >
            <Title order={4} mb="md">
              ❤️ Calidad
            </Title>

            <Text c="dimmed" mt="sm">
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