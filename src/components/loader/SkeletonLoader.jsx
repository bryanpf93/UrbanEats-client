import {
  Card,
  Skeleton,
  Group
} from "@mantine/core";

function RestaurantCardSkeleton() {
  return (
    <Card
      shadow="md"
      padding="lg"
      radius="xl"
      withBorder
      w="100%"
    >
      <Card.Section>
        <Skeleton height={280} />
      </Card.Section>

      <Skeleton
        height={28}
        mt="lg"
        width="70%"
        mx="auto"
      />

      <Skeleton
        height={22}
        mt="sm"
        width="40%"
        mx="auto"
      />

      <Group justify="center" mt="sm">
        <Skeleton height={20} circle />
        <Skeleton height={20} width={40} />
      </Group>
    </Card>
  );
}

export default RestaurantCardSkeleton;

