import {
  Container,
  Grid,
  Title,
  Text,
  Button,
  Image
} from "@mantine/core";

import heroFood from "../../assets/images/hero-food.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme.context";

function Hero() {

  const { colorScheme } = useContext(ThemeContext)

  return (
    <section
      style={{
        background:
          colorScheme === "dark"
            ? "linear-gradient(135deg, #1a1b1e 0%, #25262b 50%, #2c2e33 100%)"
            : "linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #ffffff 100%)",
        padding: "4rem 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container size="xl">

        <Grid align="center">

          {/* LEFT */}
          <Grid.Col span={{ base: 12, md: 6 }} style={{ textAlign: "center" }}>

            <Title
              size="clamp(2rem, 3.8vw, 4rem)"
              fw={600}
              lh={1}
              c="var(--mantine-color-text)"
            >
              La mejor comida de tu ciudad,{" "}
              <span style={{ color: "#f97316" }}>
                directo a tu puerta.
              </span>
            </Title>


            <Text
              size="lg"
              mt="lg"
              mb="xl"
              c="dimmed"
            >
              Descubre restaurantes increíbles, pide tus platos favoritos
              y disfruta donde quieras en cuestión de minutos.
            </Text>


            <Button
              size="xl"
              color="orange"
              radius="xl"
              component={Link}
              to={"/restaurants"}
            >
              Explorar Restaurantes
            </Button>

          </Grid.Col>


          {/* RIGHT */}
          <Grid.Col
            span={{ base: 12, md: 6 }}
            mt={{ base: "xl", md: 0 }}
          >
            <Image
              src={heroFood}
              radius="md"
              w="100%"
              maw={{ base: 450, md: 650 }}
              mx="auto"
            />
          </Grid.Col>

        </Grid>


      </Container>
    </section>
  );
}

export default Hero;