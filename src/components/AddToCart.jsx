import React, { useReducer } from "react";

// Reducer function
const reducer = (cart, action) => {
  switch (action.type) {
    case "add":
      return [...cart, action.item];
    case "remove":
      return cart.filter((item) => item.id !== action.id);
    default:
      return cart;
  }
};

// Component
export const AddToCart = () => {
  const [cart, dispatch] = useReducer(reducer, []);

  const handleAddToCart = (item) => {
    dispatch({ type: "add", item });
  };

  const handleRemoveFromCart = (id) => {
    dispatch({ type: "remove", id });
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => handleRemoveFromCart(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => handleAddToCart({ id: 1, name: "Product 1", price: 10 })}
      >
        Add Product 1
      </button>
      <button
        onClick={() => handleAddToCart({ id: 2, name: "Product 2", price: 20 })}
      >
        Add Product 2
      </button>
    </div>
  );
};
