import { useState, useEffect } from "react";
import { db } from "../data/db";
import type { CartItems, Guitar } from "../types/types";

 
const useCart = () =>{

    const initialCart = (): CartItems[] => {
        const localStoreCart = localStorage.getItem("cart");
        return localStoreCart ? JSON.parse(localStoreCart) : [];
      };
    
      const [data] = useState(db);
      const [cart, setCart] = useState(initialCart);
    
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
      }, [cart]);
    
      function addToCart(item: Guitar) {
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    
        if (itemExists < 0) {
          const newItem : CartItems = {...item, quantity: 1}
          setCart([...cart, newItem]);
        } else {
          const updateCarrito = [...cart];
          updateCarrito[itemExists].quantity++;
          setCart(updateCarrito);
        }
      }
    
      function emptyItem(id: Guitar["id"]) {
        const emptyById = cart.filter((guitar) => guitar.id !== id);
        setCart(emptyById);
      }
    
      function emptyCart() {
        const emptyAll: []  = [];
        setCart(emptyAll);
      }
    
      function totalP() {
        const total = cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        return total;
      }
    
      function reduce(item: CartItems) {
        const matching = cart.findIndex((guitar) => guitar.id === item.id);
        if (item.quantity > 1) {
          const reductor = [...cart];
          reductor[matching].quantity--;
          setCart(reductor);
        } else emptyItem(item.id);
      }
    
      function aument(item: CartItems) {
        const matching = cart.findIndex((guitar) => guitar.id === item.id);
    
        if (item.quantity < 5) {
          const aumentador = [...cart];
          aumentador[matching].quantity++;
          setCart(aumentador);
        }
      }
    

return {
    data, 
    cart,
    initialCart, 
    addToCart,
    emptyItem,
    emptyCart,
    totalP,
    reduce,
    aument,

}
}

export default useCart