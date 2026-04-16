import "./CartItem.css"
import { useContext } from "react"
import { CartContext } from "../../context/cart.context"
import {
  Card,
  Group,
  Image,
  Text,
  Button,
  ActionIcon,
  Stack,
  Flex
} from "@mantine/core";

import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import ConfirmModal from "../modals/ConfirmModal";

function CartItem({ item }) {

  const { addToCart, removeFromCart, updateQuantity } = useContext(CartContext)

  const handleIncrease = () => {
    addToCart({
      _id: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurant: item.restaurantId
    })
  }

  const handleDecrease = () => {

    if (item.quantity === 1) {
      return removeFromCart(item.productId)
    }

    updateQuantity(
      item.productId,
      item.quantity - 1
    )
  }

  const confirmRemoveItem = () => {
    ConfirmModal({
      title: "Eliminar producto",

      message: `¿Seguro que quieres eliminar ${item.name} del carrito?`,

      confirmText: "Eliminar",

      onConfirm: () => removeFromCart(item.productId),
    });
  };

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

          <Image
            src={item.image}
            w={100}
            h={100}
            radius="md"
          />

          <div style={{ flex: 1 }}>
            <Text fw={600} size="lg" lineClamp={2}>
              {item.name}
            </Text>

            <Text c="dimmed">
              {item.price}€
            </Text>
          </div>

        </Group>


        <Flex
          direction={{ base: "column", md: "row" }}
          gap="xs"
          align="center"
        >

          <Group gap="xs">
            <ActionIcon
              variant="light"
              onClick={handleDecrease}
            >
              <IconMinus size={16} />
            </ActionIcon>

            <Text fw={500}>
              {item.quantity}
            </Text>

            <ActionIcon
              variant="light"
              onClick={handleIncrease}
            >
              <IconPlus size={16} />
            </ActionIcon>
          </Group>

          <Button
            color="red"
            variant="light"
            onClick={confirmRemoveItem}
            leftSection={<IconTrash size={16} />}
          >
            Eliminar
          </Button>

        </Flex>

      </Group>
    </Card>
  )
}

export default CartItem