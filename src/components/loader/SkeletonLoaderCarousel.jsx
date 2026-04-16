import { Carousel } from "@mantine/carousel";
import RestaurantCardSkeleton from "./SkeletonLoader";

function RestaurantCarouselSkeleton() {
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
      {Array.from({ length: 3 }).map((_, index) => (
        <Carousel.Slide key={index}>
          <RestaurantCardSkeleton />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default RestaurantCarouselSkeleton;