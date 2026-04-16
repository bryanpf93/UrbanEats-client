import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
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

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const { storeToken, authenticateUser } = useContext(AuthContext)
  const { colorScheme } = useContext(ThemeContext);


  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log('JWT token', response.data.authToken)
        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/')
      })
      .catch((error) => {
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
  }

 return (
    <Container size={420} my={40}>
      <Title ta="center" mb="lg">
        Iniciar sesión
      </Title>

      <Paper shadow="md" p="xl" radius="md" withBorder bg={
          colorScheme === "dark"
            ? "dark.6"
            : "#fff7ed"
        }>

        <form onSubmit={handleLoginSubmit}>
          <Stack >

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
              Login
            </Button>

          </Stack>
        </form>

        {errorMessage && (
          <Text c="red" mt="md">
            {errorMessage}
          </Text>
        )}

        <Text ta="center" mt="md">
          ¿No tienes cuenta?{" "}
          <Link to="/signup">Crear cuenta</Link>
        </Text>

      </Paper>
    </Container>
  );
}

export default Login