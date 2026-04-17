# 🍔 UrbanEats Frontend

 🚀 Aplicación web para explorar restaurantes, añadir productos al carrito y gestionar pedidos de forma rápida e intuitiva.
 
 ---

### 📸 Preview

![Demo](src/assets/Images/urbaneats.gif)

---

### 🛠️ Tecnologías

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Mantine](https://img.shields.io/badge/Mantine-339AF0?style=for-the-badge&logo=mantine&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

---
### 🌐 Demo

Frontend: https://urban-eats-client.vercel.app

----

### ⚙️ Instalación


```bash
git clone https://github.com/bryanpf93/UrbanEats-client.git
cd UrbanEats-client
npm install
```

Crear archivo `.env`:

```env
VITE_API_URL=https://urban-eats-server-smoky.vercel.app
```

Ejecutar la app:

```bash
npm run dev
```

---

### 🧭 Rutas principales

| Ruta | Descripción |
|------|------------|
| `/` | Página principal |
| `/restaurants` | Listado de restaurantes |
| `/restaurants/:id` | Detalle de un restaurante |
| `/cart` | Carrito de compra |
| `/orders` | Historial de pedidos |
| `/login` | Inicio de sesión |
| `/signup` | Registro de usuario |

🔒 Rutas protegidas:
- `/cart`
- `/orders`

----

### ✨ Features

- 🔐 Autenticación de usuarios
- 🔍 Búsqueda de restaurantes
- 🛒 Carrito de compra
- 📦 Gestión de pedidos
- 🌙 Modo oscuro / claro (Theme Toggle)
- ⚡ Skeleton loaders para mejorar la experiencia de usuario
- 📱 Diseño responsive

---

### 📁 Estructura del proyecto

```
src/
|── assets/
│── components/
│── pages/
│── context/
│── services/
│── App.jsx
│── main.jsx
```

---
### 📚 Aprendizajes

- Manejo de estado global con Context API
- Integración con APIs REST
- Mejora de UX con skeleton loaders
- Diseño responsive con Mantine
- Gestión de autenticación con tokens

---

### 🚀 Mejoras futuras

- ⭐ Sistema de valoraciones
- ❤️ Favoritos
- 🌍 Multi-idioma

---

### 👤 Autor

- Bryan Santiago Paucarima Franco - Ironhack
- https://www.linkedin.com/in/bryanpf93/