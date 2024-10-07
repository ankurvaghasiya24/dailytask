import React, { useReducer } from 'react';

const initialState = {
    step: 0,
    shippingInfo: {},
    paymentMethod: {},
};

const NEXT_STEP = 'NEXT_STEP';
const PREVIOUS_STEP = 'PREVIOUS_STEP';
const UPDATE_SHIPPING_INFO = 'UPDATE_SHIPPING_INFO';
const UPDATE_PAYMENT_METHOD = 'UPDATE_PAYMENT_METHOD';

const reducer = (state, action) => {
    switch (action.type) {
        case NEXT_STEP:
            return { ...state, step: state.step + 1 };
        case PREVIOUS_STEP:
            return { ...state, step: state.step - 1 };
        case UPDATE_SHIPPING_INFO:
            return { ...state, shippingInfo: action.payload };
        case UPDATE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload };
        default:
            return state;
    }
};

const ShippingInfoForm = ({ onNext, onUpdateShippingInfo }) => {
    const [formData, setFormData] = React.useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateShippingInfo(formData);
        onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h2 className="mb-3">Shipping Information</h2>
            <div className="form-group">
                <input className="form-control" name="address" onChange={handleChange} placeholder="Address" required />
            </div>
            <div className="form-group">
                <input className="form-control" name="city" onChange={handleChange} placeholder="City" required />
            </div>
            <div className="form-group">
                <input className="form-control" name="zip" onChange={handleChange} placeholder="ZIP Code" required />
            </div>
            <button type="submit" className="btn btn-primary">Next</button>
        </form>
    );
};

const PaymentMethodForm = ({ onNext, onPrevious, onUpdatePaymentMethod }) => {
    const [paymentData, setPaymentData] = React.useState({});

    const handleChange = (e) => {
        setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdatePaymentMethod(paymentData);
        onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h2 className="mb-3">Payment Method</h2>
            <div className="form-group">
                <input className="form-control" name="cardNumber" onChange={handleChange} placeholder="Card Number" required />
            </div>
            <div className="form-group">
                <input className="form-control" name="expiryDate" onChange={handleChange} placeholder="Expiry Date" required />
            </div>
            <button type="button" className="btn btn-secondary mr-2" onClick={onPrevious}>Back</button>
            <button type="submit" className="btn btn-primary">Next</button>
        </form>
    );
};

const OrderConfirmation = ({ shippingInfo, paymentMethod, onPrevious }) => {
    return (
        <div className="mb-4">
            <h2 className="mb-3">Order Confirmation</h2>
            <h3>Shipping Info:</h3>
            <p>Address: {shippingInfo.address}</p>
            <p>City: {shippingInfo.city}</p>
            <p>ZIP: {shippingInfo.zip}</p>

            <h3>Payment Method:</h3>
            <p>Card Number: {paymentMethod.cardNumber}</p>
            <p>Expiry Date: {paymentMethod.expiryDate}</p>

            <button className="btn btn-secondary mr-2" onClick={onPrevious}>Back</button>
            <button className="btn btn-success" onClick={() => alert('Order placed!')}>Place Order</button>
        </div>
    );
};

const Checkout = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleNext = () => {
        dispatch({ type: NEXT_STEP });
    };

    const handlePrevious = () => {
        dispatch({ type: PREVIOUS_STEP });
    };

    return (
        <div className="container mt-4">
            {state.step === 0 && (
                <ShippingInfoForm
                    onNext={handleNext}
                    onUpdateShippingInfo={(data) =>
                        dispatch({ type: UPDATE_SHIPPING_INFO, payload: data })
                    }
                />
            )}
            {state.step === 1 && (
                <PaymentMethodForm
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    onUpdatePaymentMethod={(data) =>
                        dispatch({ type: UPDATE_PAYMENT_METHOD, payload: data })
                    }
                />
            )}
            {state.step === 2 && (
                <OrderConfirmation
                    shippingInfo={state.shippingInfo}
                    paymentMethod={state.paymentMethod}
                    onPrevious={handlePrevious}
                />
            )}
        </div>
    );
};

const App = () => {
    return (
        <div>
            <h1 className="text-center my-4">Checkout Flow</h1>
            <Checkout />
        </div>
    );
};

export default App;

