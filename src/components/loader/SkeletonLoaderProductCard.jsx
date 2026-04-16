import {
  Card,
  Skeleton,
  Group
} from "@mantine/core";

function SkeletonLoaderProductCard() {
  return (
    <Card
      shadow="md"
      padding="lg"
      radius="xl"
      withBorder
    >
      <Card.Section>
        <Skeleton height={280} />
      </Card.Section>

      <Skeleton
        height={28}
        mt="lg"
        width="70%"
      />

      <Skeleton
        height={20}
        mt="sm"
        width="40%"
      />

      <Skeleton
        height={18}
        mt="md"
        width="100%"
      />

      <Skeleton
        height={18}
        mt="xs"
        width="80%"
      />

      <Group mt="xl" justify="center">
        <Skeleton height={22} width={100} />
        <Skeleton height={36} width={120} radius="md" />
      </Group>
    </Card>
  );
}

export default SkeletonLoaderProductCard;