import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = {
    items: [],
    totalItems: 0,
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const updatedItems = [...state.items, action.payload];
            return {
                items: updatedItems,
                totalItems: updatedItems.length,
                totalAmount: updatedItems.reduce((acc, item) => acc + item.price, 0),
            };
        case 'REMOVE_FROM_CART':
            const filteredItems = state.items.filter(item => item.id !== action.payload.id);
            return {
                items: filteredItems,
                totalItems: filteredItems.length,
                totalAmount: filteredItems.reduce((acc, item) => acc + item.price, 0),
            };
        default:
            return state;
    }
};

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    return useContext(CartContext);
};

const products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
];

const ProductList = () => {
    const { dispatch } = useCart();

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    return (
        <div className="container mt-4">
            <h2>Products</h2>
            <div className="row">
                {products.map(product => (
                    <div className="col-md-4 mb-3" key={product.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">Price: ${product.price}</p>
                                <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Cart = () => {
    const { state, dispatch } = useCart();

    const removeFromCart = (product) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    };

    return (
        <div className="container mt-4">
            <h2>Cart</h2>
            {state.items.length === 0 ? (
                <p>No items in the cart</p>
            ) : (
                <div>
                    {state.items.map(item => (
                        <div className="row mb-3" key={item.id}>
                            <div className="col-md-8">
                                <h5>{item.name}</h5>
                                <p>Price: ${item.price}</p>
                            </div>
                            <div className="col-md-4 text-right">
                                <button className="btn btn-danger" onClick={() => removeFromCart(item)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <h3>Total Items: {state.totalItems}</h3>
                    <h3>Total Amount: ${state.totalAmount}</h3>
                </div>
            )}
        </div>
    );
};

const EcommercePlatform = () => {
    return (
        <CartProvider>
            <div className="container">
                <h1 className="mt-4">E-commerce Platform</h1>
                <ProductList />
                <Cart />
            </div>
        </CartProvider>
    );
};

export default EcommercePlatform;

