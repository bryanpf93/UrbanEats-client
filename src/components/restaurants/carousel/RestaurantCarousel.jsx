import { Carousel } from "@mantine/carousel";
import RestaurantCard from "../restaurantcard/RestaurantCard";

function RestaurantCarousel({ restaurants }) {
  const topRatedRestaurants = [...restaurants]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  return (
    <Carousel
      w="100%"
      slideSize={{
        base: "410px",
        sm: "47%",
        lg: "33.333%"
      }}
      slideGap={{
        base: "md",
        sm: "lg",
        lg: "lg"
      }}
      align="start"
      withControls
      loop
    >
      {topRatedRestaurants.map((restaurant) => (
        <Carousel.Slide key={restaurant._id}>
          <RestaurantCard restaurant={restaurant} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default RestaurantCarousel;