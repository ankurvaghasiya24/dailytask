// 3. Form Input Handling: Create a form with ten inputs and use useState to manage the form 
// values (text, checkbox, radio, select, color, date, number, password, range). 


import React, { useState } from 'react';

const Task3 = () => {
  const [formValues, setFormValues] = useState({
    text: '',
    checkbox: false,
    radio: '',
    select: '',
    color: '#000000',
    date: '',
    number: 0,
    password: '',
    range: 50,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4 w-50">
      <h2>Form Example</h2>

      <div className="form-group">
        <label>Text:</label>
        <input type="text" className="form-control" name="text" value={formValues.text} onChange={handleChange} />
      </div>

      <div className="form-check">
        <input
          type="checkbox" className="form-check-input" name="checkbox" checked={formValues.checkbox} onChange={handleChange} />
        <label className="form-check-label">Checkbox</label>
      </div>

      <div className="form-group">
        <label>Radio:</label>
        <div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="radio" value="option1" checked={formValues.radio === 'option1'}
                   onChange={handleChange}/>
            <label className="form-check-label">Option 1</label>
          </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="radio" value="option2" checked={formValues.radio === 'option2'} onChange={handleChange}/>
            <label className="form-check-label">Option 2</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Select:</label>
        <select className="form-control" name="select" value={formValues.select} onChange={handleChange} >
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
      </div>

      <div className="form-group">
        <label>Color:</label>
        <input type="color" className="form-control" name="color" value={formValues.color} onChange={handleChange}/>
      </div>

      <div className="form-group">
        <label>Date:</label>
        <input type="date" className="form-control" name="date" value={formValues.date} onChange={handleChange}/>
      </div>

      <div className="form-group">
        <label>Number:</label>
        <input type="number" className="form-control" name="number" value={formValues.number} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input type="password" className="form-control" name="password" value={formValues.password} onChange={handleChange}/>
      </div>

      <div className="form-group">
        <label>Range:</label>
        <input type="range" className="form-control-range" name="range" value={formValues.range} min="0" max="100" onChange={handleChange} />
        <span>{formValues.range}</span>
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default Task3;
