import {
  Menu,
  Avatar,
  UnstyledButton
} from "@mantine/core";



import { IconChevronDown, IconUser } from "@tabler/icons-react";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth.context";
import { Link, useNavigate } from "react-router-dom";

function UserMenu() {

  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const isAdmin = user?.role === "admin"
  const navigate = useNavigate()

  const handleLogout = () => {
    logOutUser()
    navigate("/")
  }


  return (
    <Menu
      shadow="lg"
      width={220}
      radius="md"
      offset={8}
      position="bottom-end"
      withinPortal
      zIndex={9999}
    >
      <Menu.Target>

        <UnstyledButton
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <Avatar radius="xl" color="orange">
            {user
              ? user.name.charAt(0).toUpperCase()
              : <IconUser size={18} />
            }
          </Avatar>

          <IconChevronDown size={16} />
        </UnstyledButton>

      </Menu.Target>

      <Menu.Dropdown>

        {!isLoggedIn ? (
          <>

            <Menu.Item
              component={Link}
              to="/login"
            >
              Iniciar sesión
            </Menu.Item>

            <Menu.Item
              component={Link}
              to="/signup"
            >
              Registrarse
            </Menu.Item>

          </>
        ) : (
          <>

            <Menu.Item>
              Perfil
            </Menu.Item>

            {isAdmin && (
              <Menu.Item
                component={Link}
                to="/admin/restaurants/new"
              >
                Crear restaurante
              </Menu.Item>
            )}

            <Menu.Item
              component={Link}
              to="/orders"
            >
              Mis pedidos
            </Menu.Item>

            <Menu.Item
              component={Link}
              to="/cart"
            >
              Mi carrito
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item
              color="red"
              onClick={handleLogout}
            >
              Cerrar sesión
            </Menu.Item>

          </>
        )}

      </Menu.Dropdown>
    </Menu>
  );
}

export default UserMenu;