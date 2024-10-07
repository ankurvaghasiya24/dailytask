// import React from 'react'

// function MultiStepForm() {
//   return (
//     <div>

//       <form>
//         <label>
//             First Name : 
//             <input type='text' placeholder='Enter FirstName' />
//         </label>
//         <label>
//             Last Name : 
//             <input type='text' placeholder='Enter LastName' />
//         </label>
//       </form>

//       <form>
//         <label>
//             Address : 
//             <input type='text' placeholder='Enter Address' />
//         </label>
//         <label>
//             City : 
//             <input type='text' placeholder='Enter City' />
//         </label>
//         <label>
//             Zip Code : 
//             <input type='number' placeholder='Zip Code' />
//         </label>
//       </form>


//       <form>
//         <label>
//             Credit Card Number : 
//             <input type='text' placeholder='Credit Card Number' />
//         </label>
//         <label>
//             Expiry Date (MM/YY) : 
//             <input type='text' placeholder='Expiry Date (MM/YY)' />
//         </label>
//         <label>
//             CVV : 
//             <input type='text' placeholder='CVV' />
//         </label>
//       </form>

//     </div>
//   )
// }

// export default MultiStepForm



import React, { useState } from 'react';

function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    creditCardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="container mt-5 col-md-4">
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
        {step === 0 && (
          <div>
            <h4>Step 1: Personal Information</h4>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type='text'
                className='form-control'
                name='firstName'
                placeholder='Enter First Name'
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type='text'
                className='form-control'
                name='lastName'
                placeholder='Enter Last Name'
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h4>Step 2: Address Information</h4>
            <div className="form-group">
              <label>Address:</label>
              <input
                type='text'
                className='form-control'
                name='address'
                placeholder='Enter Address'
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>City:</label>
              <input
                type='text'
                className='form-control'
                name='city'
                placeholder='Enter City'
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Zip Code:</label>
              <input
                type='number'
                className='form-control'
                name='zipCode'
                placeholder='Zip Code'
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h4>Step 3: Payment Information</h4>
            <div className="form-group">
              <label>Credit Card Number:</label>
              <input type='text' className='form-control' name='creditCardNumber' placeholder='Credit Card Number'
                value={formData.creditCardNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Expiry Date (MM/YY):</label>
              <input type='text' className='form-control' name='expiryDate' placeholder='Expiry Date (MM/YY)'
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>CVV:</label>
              <input type='text' className='form-control' name='cvv' placeholder='CVV'
                value={formData.cvv}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        <div className="mt-3">
          {step > 0 && (
            <button type='button' className='btn btn-secondary' onClick={handleBack}>Back</button>
          )}
          {step < 2 ? (
            <button type='button' className='btn btn-primary' onClick={handleNext}>Next</button>
          ) : (
            <button type='submit' className='btn btn-success'>Submit</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default MultiStepForm;




// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const steps = ['Personal Info', 'Address', 'Payment Info'];

// const validationSchemas = [
//   Yup.object().shape({
//     firstName: Yup.string().required('First Name is required'),
//     lastName: Yup.string().required('Last Name is required'),
//   }),
//   Yup.object().shape({
//     address: Yup.string().required('Address is required'),
//     city: Yup.string().required('City is required'),
//     zipCode: Yup.number().required('Zip Code is required').typeError('Zip Code must be a number'),
//   }),
//   Yup.object().shape({
//     creditCard: Yup.string().required('Credit Card number is required').matches(/^\d{16}$/, 'Credit Card must be 16 digits'),
//     expiryDate: Yup.string().required('Expiry Date is required'),
//     cvv: Yup.string().required('CVV is required').matches(/^\d{3}$/, 'CVV must be 3 digits'),
//   }),
// ];

// const MultiStepForm = () => {
//   const [step, setStep] = useState(0);
//   const [formData, setFormData] = useState({});

//   const handleNext = (values) => {
//     setFormData({ ...formData, ...values });
//     setStep(step + 1);
//   };

//   const handleBack = () => {
//     setStep(step - 1);
//   };

//   const handleSubmit = (values) => {
//     setFormData({ ...formData, ...values });
//     console.log('Final Data: ', { ...formData, ...values });
//   };

//   return (
//     <div className="container mt-5 col-md-4">
//       <h1 className="mb-4">Multi-Step Form</h1>
//       <h2 className="mb-3">{steps[step]}</h2>
//       <Formik
//         initialValues={formData}
//         validationSchema={validationSchemas[step]}
//         onSubmit={step === steps.length - 1 ? handleSubmit : handleNext}
//       >
//         {() => (
//           <Form>
//             {step === 0 && (
//               <div className="mb-3">
//                 <div className="form-group">
//                   <label htmlFor="firstName">First Name</label>
//                   <Field name="firstName" className="form-control" placeholder="First Name" />
//                   <ErrorMessage name="firstName" component="div" className="text-danger" />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="lastName">Last Name</label>
//                   <Field name="lastName" className="form-control" placeholder="Last Name" />
//                   <ErrorMessage name="lastName" component="div" className="text-danger" />
//                 </div>
//               </div>
//             )}
//             {step === 1 && (
//               <div className="mb-3">
//                 <div className="form-group">
//                   <label htmlFor="address">Address</label>
//                   <Field name="address" className="form-control" placeholder="Address" />
//                   <ErrorMessage name="address" component="div" className="text-danger" />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="city">City</label>
//                   <Field name="city" className="form-control" placeholder="City" />
//                   <ErrorMessage name="city" component="div" className="text-danger" />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="zipCode">Zip Code</label>
//                   <Field name="zipCode" className="form-control" type="number" placeholder="Zip Code" />
//                   <ErrorMessage name="zipCode" component="div" className="text-danger" />
//                 </div>
//               </div>
//             )}
//             {step === 2 && (
//               <div className="mb-3">
//                 <div className="form-group">
//                   <label htmlFor="creditCard">Credit Card Number</label>
//                   <Field name="creditCard" className="form-control" placeholder="Credit Card Number" />
//                   <ErrorMessage name="creditCard" component="div" className="text-danger" />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
//                   <Field name="expiryDate" className="form-control" placeholder="Expiry Date (MM/YY)" />
//                   <ErrorMessage name="expiryDate" component="div" className="text-danger" />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="cvv">CVV</label>
//                   <Field name="cvv" className="form-control" placeholder="CVV" />
//                   <ErrorMessage name="cvv" component="div" className="text-danger" />
//                 </div>
//               </div>
//             )}
//             <div className="mt-4">
//               {step > 0 && <button type="button" className="btn btn-secondary me-2" onClick={handleBack}>Back</button>}
//               <button type="submit" className="btn btn-primary">{step === steps.length - 1 ? 'Submit' : 'Next'}</button>
//             </div>
//             <div className="mt-3">
//               {`Step ${step + 1} of ${steps.length}`}
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };


// export default MultiStepForm;