import {
  Card,
  Group,
  Skeleton
} from "@mantine/core";

function OrderCardSkeleton() {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="xl"
      withBorder
      mb="md"
    >
      <Group justify="space-between" align="center">

        <Skeleton
          width={150}
          height={150}
          radius="md"
        />

        <div style={{ flex: 1 }}>
          <Skeleton height={26} width={180} mb="sm" />
          <Skeleton height={18} width={140} mb="xs" />
          <Skeleton height={18} width={140} mb="xs" />
          <Skeleton height={18} width={100} />
        </div>

        <div>
          <Skeleton height={20} width={80} mb="sm" />
          <Skeleton height={36} width={120} radius="md" />
        </div>

      </Group>
    </Card>
  );
}

export default OrderCardSkeleton;