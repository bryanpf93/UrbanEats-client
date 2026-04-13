import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth.context";


const CartContext = createContext()

function CartProviderWrapper({ children }) {

  const { user, isLoading } = useContext(AuthContext)

  const [cart, setCart] = useState([])
  const [cartLoaded, setCartLoaded] = useState(false)


  // ESTE USEEFFECT CARGA EL CARRITO DEL USUARIO CUANDO LOGIN/REFRESH
  useEffect(() => {

    // ESPERAR A QUE AUTH TERMINE DE CARGAR
    if (isLoading) return

    if (!user) {
      setCart([])
      setCartLoaded(true)
      return
    }

    const storedCart = localStorage.getItem(`cart_${user._id}`)

    if (storedCart) {
      setCart(JSON.parse(storedCart))
      setCartLoaded(true)
      return
    }

    setCart([])
    setCartLoaded(true)
  }, [user, isLoading])


  // ESTE USEEFFECT GUARDA EL CARRITO EN LOCALSTORAGE CADA VEZ QUE CAMBIA
  useEffect(() => {

    if (!cartLoaded) return

    if (!user) return

    localStorage.setItem(`cart_${user._id}`, JSON.stringify(cart))

  }, [cart, user, cartLoaded])

  const addToCart = (product) => {

    // IMPEDIR MEZCLAR PRODUCTOS DE DISTINTOS RESTAURANTES
    if (cart.length && cart[0].restaurantId !== product.restaurant) {
      return alert("No puedes mezclar restaurantes")  // poner modal
    }

    // BUSCAMOS SI EL PRODUCTO YA EXISTE EN EL CARRITO
    const existing = cart.find(p => p.productId === product._id)

    // SI YA EXISTE AUMENTAMOS CANTIDAD
    if (existing) {
      const updatedCart = cart.map(p =>
        p.productId === product._id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )

      setCart(updatedCart)
      return
    }

    // SI NO EXISTE CREAMOS NUEVO ITEM
    const newItem = {
      productId: product._id,
      restaurantId: product.restaurant,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    }

    setCart([...cart, newItem])

  }

  const removeFromCart = (productId) => {

    const updatedCart = cart.filter(p => p.productId !== productId)
    setCart(updatedCart)
  }

  const updateQuantity = (productId, quantity) => {

    if (quantity < 1) return

    const updatedCart = cart.map(p =>
      p.productId === productId
        ? { ...p, quantity }
        : p
    )

    setCart(updatedCart)
  }

  const clearCart = () => {
    setCart([])
  }

  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { CartProviderWrapper, CartContext }