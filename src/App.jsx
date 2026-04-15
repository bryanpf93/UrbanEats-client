import { Route, Routes } from "react-router-dom";

import NavBar from "./components/layout/navbar/NavBar";

import Signup from "./pages/auth/signup/Signup";
import Login from "./pages/auth/login/Login";

import IsAdmin from "./components/guards/IsAdmin";
import IsPrivate from "./components/guards/IsPrivate";
import IsAnon from "./components/guards/IsAnon";

import Home from "./pages/home/Home";
import About from "./pages/about/About";
import NotFound from "./pages/notfound/NotFound";

import RestaurantList from "./pages/restaurants/restaurantlist/RestaurantList";
import RestaurantDetails from "./pages/restaurants/restaurantdetails/RestaurantDetails";
import CreateRestaunt from "./pages/admin/restaurant/create/CreateRestaurant";
import EditRestaurant from "./pages/admin/restaurant/edit/EditRestaurant";

import CreateProduct from "./pages/admin/product/create/CreateProduct";
import EditProduct from "./pages/admin/product/edit/EditProduct";

import Cart from "./pages/cart/Cart";
import OrderList from "./pages/orders/orderList/OrderList";
import OrderDetails from "./pages/orders/orderdetails/OrderDetails";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";


function App() {

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <Header />

      <main>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />

          {/** AUTH */}
          <Route path="/signup" element={<IsAnon><Signup /></IsAnon>} />
          <Route path="/login" element={<IsAnon><Login /></IsAnon>} />

          {/** ADMIN */}
          <Route path="/admin/restaurants/new" element={<IsAdmin><CreateRestaunt /></IsAdmin>} />
          <Route path="/admin/restaurants/:restaurantId/edit" element={<IsAdmin><EditRestaurant /></IsAdmin>} />
          <Route path="/admin/restaurants/:restaurantId/products/new" element={<IsAdmin><CreateProduct /></IsAdmin>} />
          <Route path="/admin/restaurants/:restaurantId/products/:productId/edit" element={<IsAdmin><EditProduct /></IsAdmin>} />

          {/** USER */}
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/restaurants/:restaurantId" element={<RestaurantDetails />} />
          <Route path="/cart" element={<IsPrivate><Cart /></IsPrivate>} />
          <Route path="/orders" element={<IsPrivate><OrderList /></IsPrivate>} />
          <Route path="/orders/:orderId" element={<IsPrivate><OrderDetails /></IsPrivate>} />

        </Routes>
      </main>



      <Footer />

    </div>
  )
}

export default App
