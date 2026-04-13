import { Route, Routes } from "react-router-dom";
import NavBar from "./components/layout/navbar/NavBar";
import Signup from "./pages/auth/signup/Signup";
import Login from "./pages/auth/login/Login";
import RestaurantList from "./pages/restaurants/restaurantlist/RestaurantList";
import IsPrivate from "./components/isprivate/IsPrivate";
import IsAnon from "./components/isanon/IsAnon";
import RestaurantDetails from "./pages/restaurants/restaurantdetails/RestaurantDetails";
import About from "./pages/about/About";
import NotFound from "./pages/notfound/NotFound";
import Cart from "./pages/cart/Cart";
import OrderList from "./pages/orders/orderList/OrderList";
import OrderDetails from "./pages/orders/orderdetails/OrderDetails";


function App() {


  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<h1>HOMEPAGE</h1>}/>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurants/:restaurantId" element={<RestaurantDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />

        <Route path="/signup" element={<IsAnon><Signup /></IsAnon>} />
        <Route path="/login" element={<IsAnon><Login /></IsAnon>} />
      </Routes>
    </>
  )
}

export default App
