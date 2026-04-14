import { useContext } from "react";
import { AuthContext } from "../../../context/auth.context";
import { Link } from "react-router-dom";



function NavBar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
  const isAdmin = user?.role === "admin"

  return (
    <nav>

      {isAdmin && (
        <>
          <Link to="/admin/restaurants/new"><button>New Restaurant</button></Link>
          <Link to="/admin/products/new"><button>New Product</button></Link>
        </>
      )}

      {isLoggedIn && (
        <>
          <Link to="/restaurants"><button>Restaurants</button></Link>
          <Link to="/cart"><button>Cart</button></Link>
          <Link to="/orders"><button>Orders</button></Link>      

          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/"><button>Home</button></Link>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}
    </nav>
  );
}

export default NavBar