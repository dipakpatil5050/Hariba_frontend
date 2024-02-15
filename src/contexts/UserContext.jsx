import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    // Load user cart data from local storage if available
    const userData = localStorage.getItem("userData");
    if (userData) {
      setUserCart(JSON.parse(userData).cart || []);
    }
  }, []);

  // const UserInfo = (id) => {
  //   const userData = localStorage.getItem("userData");
  //   if (userData) {
  //     setUserCart(JSON.parse(userData).cart || []);
  //   }
  // };

  const addToCart = (item) => {
    setUserCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (itemId) => {
    setUserCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setUserCart([]);
  };

  useEffect(() => {
    // Save user cart data to local storage whenever it changes
    localStorage.setItem("userData", JSON.stringify({ cart: userCart }));
  }, [userCart]);

  return (
    <UserContext.Provider
      value={{ userCart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </UserContext.Provider>
  );
};
