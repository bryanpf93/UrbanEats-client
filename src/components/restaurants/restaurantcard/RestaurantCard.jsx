import {
  Card,
  Group,
  Image,
  Text,
  Title
} from "@mantine/core";

import "./RestaurantCard.css"

import { Link } from "react-router-dom";
import { IconStarFilled } from "@tabler/icons-react";

function RestaurantCard({ restaurant }) {
  return (
    <Card
      component={Link}
      to={`/restaurants/${restaurant._id}`}
      shadow="md"
      padding="lg"
      radius="xl"
      withBorder
      className="restaurant-card"
      style={{
        textDecoration: "none"
      }}
    >
      <Card.Section>
        <Image
          src={restaurant.image}
          h={280}
          alt={restaurant.name}
        />
      </Card.Section>


      <Title
        order={4}
        mt="lg"
        c="dark"
        size="xl"
      >
        {restaurant.name}
      </Title>


      <Text
        c="dimmed"
        size="lg"
      >
        {restaurant.category}
      </Text>

      <Group gap={4} style={{
        display:"flex",
        justifyContent: "center"

      }}>

        <IconStarFilled
          size={18}
          color="#f97316"
        />

        <Text fw={500} size="lg" c="dark">
          {restaurant.rating || "4.8"}
        </Text>

      </Group>

    </Card>
  );
}

export default RestaurantCard;