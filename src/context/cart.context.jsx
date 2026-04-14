import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth.context";
import axios from "axios";

const CartContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

function CartProviderWrapper({ children }) {

  const { user, isLoading } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);


  const reloadCart = () => {

    if (!user) return;

    const storedCart = localStorage.getItem(`cart_${user._id}`);

    if (!storedCart) {
      setCart([]);
      setCartLoaded(true);
      return;
    }

    const parsedCart = JSON.parse(storedCart);

    if (parsedCart.length === 0) {
      setCart([]);
      setCartLoaded(true);
      return;
    }

    const restaurantId = parsedCart[0].restaurantId;

    axios
      .get(`${API_URL}/api/restaurants/${restaurantId}/products`)
      .then((response) => {

        const validProductIds = response.data.map(product => product._id);

        const cleanedCart = parsedCart.filter(item =>
          validProductIds.includes(item.productId)
        );

        setCart(cleanedCart);
        setCartLoaded(true);

      })
      .catch((err) => {
        console.log("Error validando carrito:", err);

        setCart(parsedCart);
        setCartLoaded(true);
      });
  };


  useEffect(() => {

    if (isLoading) return;

    if (!user) {
      setCart([]);
      setCartLoaded(true);
      return;
    }

    reloadCart();

  }, [user, isLoading]);


  useEffect(() => {

    if (!cartLoaded) return;
    if (!user) return;

    localStorage.setItem(`cart_${user._id}`, JSON.stringify(cart));

  }, [cart, user, cartLoaded]);


  const addToCart = (product) => {

    if (cart.length > 0 && cart[0].restaurantId !== product.restaurant) {
      return alert("No puedes mezclar restaurantes");
    }

    const existing = cart.find(p => p.productId === product._id);

    if (existing) {

      const updatedCart = cart.map(p =>
        p.productId === product._id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );

      setCart(updatedCart);
      return;
    }

    const newItem = {
      productId: product._id,
      restaurantId: product.restaurant,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    };

    setCart([...cart, newItem]);

  };


  const removeFromCart = (productId) => {

    const updatedCart = cart.filter(p => p.productId !== productId);
    setCart(updatedCart);

  };


  const updateQuantity = (productId, quantity) => {

    if (quantity < 1) return;

    const updatedCart = cart.map(p =>
      p.productId === productId
        ? { ...p, quantity }
        : p
    );

    setCart(updatedCart);

  };


  const clearCart = () => {
    setCart([]);
  };


  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        reloadCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartProviderWrapper, CartContext };