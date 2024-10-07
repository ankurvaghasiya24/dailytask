// 10. Shopping Cart Quantity: Manage item quantities in a shopping cart using useState.


import React, { useState } from 'react';

const Task10 = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Electronics', quantity: 0 },
    { id: 2, name: 'Clothing ', quantity: 0 },
  ]);

  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.map(item => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>Quantity: {item.quantity}</p>
          <button className='btn btn-success mx-2' onClick={() => handleIncrease(item.id)}>+</button>
          <button className='btn btn-danger mx-2' onClick={() => handleDecrease(item.id)}>-</button>
          <button className='btn btn-warning' onClick={() => handleRemove(item.id)}>Remove</button>
        </div>
      ))}
      <h2>
        Total Items: {cartItems.reduce((total, item) => total + item.quantity, 0)}
      </h2>
    </div>
  );
};

export default Task10;
