import { useContext } from "react";
import { ActionIcon } from "@mantine/core";
import {
  IconSun,
  IconMoon
} from "@tabler/icons-react";

import { ThemeContext } from "../../context/theme.context";

function ThemeToggle() {

  const {
    colorScheme,
    toggleTheme
  } = useContext(ThemeContext);

  return (
    <ActionIcon
      variant="light"
      radius="xl"
      size="lg"
      onClick={toggleTheme}
    >
      {colorScheme === "dark" ? (
        <IconSun size={18} />
      ) : (
        <IconMoon size={18} />
      )}
    </ActionIcon>
  );
}

export default ThemeToggle;