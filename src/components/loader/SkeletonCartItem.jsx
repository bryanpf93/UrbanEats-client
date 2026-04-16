import {
  Card,
  Group,
  Skeleton,
  Flex
} from "@mantine/core";

function CartItemSkeleton() {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="xl"
      withBorder
      mb="md"
    >
      <Group justify="space-between" align="center" wrap="nowrap">

        <Group wrap="nowrap" style={{ flex: 1 }}>

          <Skeleton
            width={100}
            height={100}
            radius="md"
          />

          <div style={{ flex: 1 }}>
            <Skeleton
              height={24}
              width="70%"
              mb="sm"
            />

            <Skeleton
              height={18}
              width="30%"
            />
          </div>

        </Group>

        <Flex
          direction={{ base: "column", md: "row" }}
          gap="xs"
          align="center"
        >
          <Group gap="xs">
            <Skeleton height={32} width={32} radius="md" />
            <Skeleton height={20} width={20} />
            <Skeleton height={32} width={32} radius="md" />
          </Group>

          <Skeleton
            height={36}
            width={100}
            radius="md"
          />
        </Flex>

      </Group>
    </Card>
  );
}

export default CartItemSkeleton;