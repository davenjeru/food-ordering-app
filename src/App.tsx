import React, {useState} from 'react';
import './App.css';
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

const App = () => {
  const [cartIsDisplayed, setCartIsDisplayed] = useState(false)
  const displayCart = () => setCartIsDisplayed(true)
  const hideCart = () => setCartIsDisplayed(false)
  return (
    <CartProvider>
      {cartIsDisplayed && <Cart onHideCart={hideCart}/>}
      <Header onDisplayCart={displayCart}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
};

export default App;
