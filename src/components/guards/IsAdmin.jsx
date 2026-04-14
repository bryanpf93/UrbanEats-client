import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"

function IsAdmin({ children }) {

  const { isLoggedIn, isLoading, user } = useContext(AuthContext)

  if (isLoading) {
    return <p>Loading ...</p>
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" />
  }

  return children

}

export default IsAdmin