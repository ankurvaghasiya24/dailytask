import React, { useState } from 'react';

const DynamicForm = () => {
  const [mainQuestion, setMainQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const handleMainQuestionChange = (event) => {
    setMainQuestion(event.target.value);
    if (event.target.value === 'no') {
      setDescription(''); // Clear the description if "No" is selected
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = [];

    if (!mainQuestion) {
      newErrors.push("Please select Yes or No for the main question.");
    }

    if (mainQuestion === 'yes' && !description.trim()) {
      newErrors.push("Please provide a description.");
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      // Submit the form or perform further actions
      alert("Form submitted successfully!");
      // Reset the form
      setMainQuestion('');
      setDescription('');
    }
  };

  return (
    <div className="container mt-4 col-md-4">
      <h2>Dynamic Form</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className="form-group">
          <legend>Main Question</legend>
          <div>
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="mainQuestion" value="yes"
                checked={mainQuestion === 'yes'}
                onChange={handleMainQuestionChange}
              /> 
              Yes
            </label>
            <label className="form-check-label ml-3">
              <input type="radio" className="form-check-input" name="mainQuestion" value="no"
                checked={mainQuestion === 'no'}
                onChange={handleMainQuestionChange}
              /> 
              No
            </label>
          </div>
        </fieldset>

        {mainQuestion === 'yes' && (
          <div className="form-group">
            <label htmlFor="description">If Yes, please describe:</label>
            <textarea
              id="description"
              className="form-control"
              value={description}
              onChange={handleDescriptionChange}
              rows="4"
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {errors.length > 0 && (
        <div id="errorMessages" className="mt-3" style={{ color: 'red' }}>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicForm;
