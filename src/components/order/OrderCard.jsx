import { Link } from "react-router-dom"
import restaurantFallBack from "../../assets/images/restaurant.png"
import "./OrderCard.css"
import {
  Card,
  Group,
  Image,
  Text,
  Title,
  Button
} from "@mantine/core"

function OrderCard({ order }) {

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="xl"
      withBorder
      mb="md"
    >
      <Group justify="space-between" align="center">

        <Group>

          <Image
            src={order.restaurant?.image}
            fallbackSrc={restaurantFallBack}
            w={150}
            h={150}
            radius="md"
          />

        </Group>

        <div>
            <Title order={4}>
              {order.restaurant?.name || "Restaurant elminado"}
            </Title>

            <Text c="dimmed">
              Fecha: {new Date(order.createdAt).toLocaleDateString()}
            </Text>

            <Text c="dimmed">
              Hora: {new Date(order.createdAt).toLocaleTimeString()}
            </Text>

            <Text>
              Estado: {order.status}
            </Text>
          </div>

        <div>
          <Text fw={600} mb="sm">
            Total: {order.total}€
          </Text>

          <Button
            component={Link}
            to={`/orders/${order._id}`}
            color="dark"
          >
            Más detalles
          </Button>
        </div>

      </Group>
    </Card>
  )
}

export default OrderCard