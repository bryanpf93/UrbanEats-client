import { Carousel } from "@mantine/carousel";
import RestaurantCard from "../restaurantcard/RestaurantCard";

function RestaurantCarousel({ restaurants }) {

  const topRatedRestaurants = [...restaurants]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  return (
    <Carousel
      w="100%"
      slideSize="33.333333%"
      slideGap="md"
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