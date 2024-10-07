import React, { useState } from 'react';

const ComplexForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        addresses: [{ street: '', city: '', state: '', zipCode: '' }],
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (index, e) => {
        const { name, value } = e.target;
        const addresses = [...formData.addresses];
        addresses[index] = { ...addresses[index], [name]: value };
        setFormData((prev) => ({ ...prev, addresses }));
    };

    const addAddress = () => {
        setFormData((prev) => ({
            ...prev,
            addresses: [...prev.addresses, { street: '', city: '', state: '', zipCode: '' }],
        }));
    };

    const removeAddress = (index) => {
        const addresses = formData.addresses.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, addresses }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (formData.addresses.length === 0) {
            newErrors.addresses = 'At least one address is required';
        } else {
            formData.addresses.forEach((address, index) => {
                if (!address.street || !address.city || !address.state || !address.zipCode) {
                    newErrors[`address-${index}`] = 'All address fields are required';
                }
            });
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form Data:', formData);
        }
    };

    return (
        <div className="container mt-5 col-md-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">
                        Name:
                        <input
                            type="text"
                            name="name"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </label>
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Email:
                        <input
                            type="email"
                            name="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </label>
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <h3>Addresses</h3>
                {formData.addresses.map((address, index) => (
                    <div key={index} className="border p-3 mb-3">
                        <div className="mb-3">
                            <label className="form-label">
                                Street:
                                <input
                                    type="text"
                                    name="street"
                                    className={`form-control ${errors[`address-${index}`] ? 'is-invalid' : ''}`}
                                    value={address.street}
                                    onChange={(e) => handleAddressChange(index, e)}
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                City:
                                <input
                                    type="text"
                                    name="city"
                                    className={`form-control ${errors[`address-${index}`] ? 'is-invalid' : ''}`}
                                    value={address.city}
                                    onChange={(e) => handleAddressChange(index, e)}
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                State:
                                <input
                                    type="text"
                                    name="state"
                                    className={`form-control ${errors[`address-${index}`] ? 'is-invalid' : ''}`}
                                    value={address.state}
                                    onChange={(e) => handleAddressChange(index, e)}
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Zip Code:
                                <input
                                    type="text"
                                    name="zipCode"
                                    className={`form-control ${errors[`address-${index}`] ? 'is-invalid' : ''}`}
                                    value={address.zipCode}
                                    onChange={(e) => handleAddressChange(index, e)}
                                />
                            </label>
                        </div>
                        <button type="button" className="btn btn-danger" onClick={() => removeAddress(index)}>
                            Remove Address
                        </button>
                        {errors[`address-${index}`] && <div className="invalid-feedback d-block">{errors[`address-${index}`]}</div>}
                    </div>
                ))}
                <button type="button" className="btn btn-primary mx-3" onClick={addAddress}>
                    Add Address
                </button>

                <button type="submit" className="btn btn-success mx-3">Submit</button>
            </form>
        </div>
    );
};

export default ComplexForm;


