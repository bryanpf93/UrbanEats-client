import {
  Burger,
  Drawer,
  Stack,
  Anchor
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";

function BurgerMenu() {

  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Burger
        opened={opened}
        onClick={toggle}
        hiddenFrom="sm"
        color="black"
      />

      <Drawer
        opened={opened}
        onClose={close}
        zIndex={2000}
        size="xl"
        styles={{
          content: {
            height: "250px",
          },
        }}
      >
        <Stack>

          <Anchor component={Link} to="/" onClick={close}>
            Home
          </Anchor>

          <Anchor component={Link} to="/restaurants" onClick={close}>
            Restaurantes
          </Anchor>

          <Anchor component={Link} to="/about" onClick={close}>
            About
          </Anchor>

        </Stack>
      </Drawer>
    </>
  );
}

export default BurgerMenu;