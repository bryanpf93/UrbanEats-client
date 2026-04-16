import { ActionIcon } from "@mantine/core";
import {
  IconSun,
  IconMoon
} from "@tabler/icons-react";

function ThemeToggle() {
  return (
    <ActionIcon
  variant="light"
  radius="xl"
  size="lg"
>
  <IconMoon size={18} />
</ActionIcon>
  );
}

export default ThemeToggle;