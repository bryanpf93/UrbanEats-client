import { Route, Routes } from "react-router-dom";
import NavBar from "./components/layout/navbar/NavBar";
import Signup from "./pages/auth/signup/Signup";
import Login from "./pages/auth/login/Login";
import RestaurantList from "./pages/restaurants/restaurantlist/RestaurantList";
import IsPrivate from "./components/isprivate/IsPrivate";
import IsAnon from "./components/isanon/IsAnon";


function App() {


  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<h1>HOMEPAGE</h1>}/>
        <Route path="/restaurants" element={<IsPrivate><RestaurantList /></IsPrivate>} />
        <Route path="/signup" element={<IsAnon><Signup /></IsAnon>} />
        <Route path="/login" element={<IsAnon><Login /></IsAnon>} />
      </Routes>
    </>
  )
}

export default App
