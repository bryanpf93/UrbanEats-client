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

function Hero() {
  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #ffffff 100%)",
        padding: "6rem 0",
        display: "flex",
        alignItems: "center",
        justifyContent:"center"
      }}
    >
      <Container size="xl">

        <Grid align="center">

          {/* LEFT */}
          <Grid.Col span={6}>

            <Title
              size="4rem"
              fw={600}
              lh={1}
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
          <Grid.Col span={6}>

            <Image
              src={heroFood}
              radius="md"
            />

          </Grid.Col>

        </Grid>


      </Container>
    </section>
  );
}

export default Hero;