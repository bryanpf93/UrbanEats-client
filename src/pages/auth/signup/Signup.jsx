import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Stack
} from "@mantine/core";
import { ThemeContext } from "../../../context/theme.context";

const API_URL = import.meta.env.VITE_API_URL

function Signup() {

  const { colorScheme } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();



  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, name };
 
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
   };


  return (
    <Container size={420} my={40}>
      <Title ta="center" mb="lg">
        Crear Cuenta
      </Title>

      <Paper shadow="md" p="xl" radius="md" withBorder bg={
          colorScheme === "dark"
            ? "dark.6"
            : "#fff7ed"
        }>

        <form onSubmit={handleSignupSubmit}>
          <Stack>

            <TextInput
              label="Nombre"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <TextInput
              label="Email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <PasswordInput
              label="Contraseña"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" fullWidth mt="md" color="orange">
              Registrarse
            </Button>

          </Stack>
        </form>

        {errorMessage && (
          <Text c="red" mt="md">
            {errorMessage}
          </Text>
        )}

        <Text ta="center" mt="md">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login">Inicia sesión</Link>
        </Text>

      </Paper>
    </Container>
  );
}

export default Signup