import React, { useReducer } from 'react';

const initialState = {
    fields: [],
};

const ADD_FIELD = 'ADD_FIELD';
const REMOVE_FIELD = 'REMOVE_FIELD';
const UPDATE_FIELD = 'UPDATE_FIELD';

const reducer = (state, action) => {
    switch (action.type) {
        case ADD_FIELD:
            return {
                ...state,
                fields: [...state.fields, action.payload],
            };
        case REMOVE_FIELD:
            return {
                ...state,
                fields: state.fields.filter((_, index) => index !== action.payload),
            };
        case UPDATE_FIELD:
            return {
                ...state,
                fields: state.fields.map((field, index) =>
                    index === action.payload.index ? { ...field, value: action.payload.value } : field
                ),
            };
        default:
            return state;
    }
};

const CustomizableFormBuilder = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    
    const handleAddField = (type) => {
        dispatch({type: ADD_FIELD, payload: { type, value: '' } });
    };

    const handleRemoveField = (index) => {
        dispatch({ type: REMOVE_FIELD, payload: index });
    };

    const handleFieldChange = (index, value) => {
        dispatch({ type: UPDATE_FIELD, payload: { index, value } });
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Customizable Form Builder</h1>
            <div className="mb-4">
                <button className="btn btn-primary me-2" onClick={() => handleAddField('text')}>Add Text Field</button>
                <button className="btn btn-primary me-2" onClick={() => handleAddField('dropdown')}>Add Dropdown</button>
                <button className="btn btn-primary" onClick={() => handleAddField('radio')}>Add Radio Button</button>
            </div>
    <form>
    {state.fields.map((field, index) => {
        switch (field.type) {
            case 'text':
                return (
            <div className="mb-3" key={index}>
                <label className="form-label">Text Field</label>
                    <input type="text" className="form-control" value={field.value} onChange={(e) => handleFieldChange(index, e.target.value)} />
                        <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveField(index)}>Remove</button>
            </div>
             );

            case 'dropdown':
                return (
            <div className="mb-3" key={index}>
                <label className="form-label">Dropdown</label>
                    <select className="form-select" value={field.value} onChange={(e) => handleFieldChange(index, e.target.value)}>
                        <option value="">Select an option</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveField(index)}>Remove</button>
            </div>
            );

            case 'radio':
                return (
            <div className="mb-3" key={index}>
                <label className="form-label">Radio Button</label>
                <div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" value="option1" checked={field.value === 'option1'} onChange={() => handleFieldChange(index, 'option1')}/>
                    <label className="form-check-label">Option 1</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" value="option2" checked={field.value === 'option2'} onChange={() => handleFieldChange(index, 'option2')}/>
                    <label className="form-check-label">Option 2</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" value="option3" checked={field.value === 'option3'} onChange={() => handleFieldChange(index, 'option3')}/>
                    <label className="form-check-label">Option 3</label>
                </div>
                </div>
                     <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveField(index)}>Remove</button>
                </div>
                );

            default:
                return null;
                    }
                })}
            </form>
        </div>
    );
};

export default CustomizableFormBuilder;
