import React, { useReducer } from 'react';

const initialState = {
    options: [
        { id: 1, text: 'Option 1', votes: 0 },
        { id: 2, text: 'Option 2', votes: 0 },
        { id: 3, text: 'Option 3', votes: 0 },
    ],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'VOTE':
            return {
                ...state,
                options: state.options.map(option =>
                    option.id === action.payload
                        ? { ...option, votes: option.votes + 1 }
                        : option
                ),
            };
        default:
            return state;
    }
};

const RealtimePolling = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleVote = (id) => {
        dispatch({ type: 'VOTE', payload: id });
    };

    return (
        <div>
            <h1>Real-Time Polling App</h1>
            <ul className=''>
                {state.options.map(option => (
                    <h6 className='my-3 mx-2' key={option.id}>
                        {option.text} Votes:- {option.votes}
                        <button className='btn btn-outline-success' onClick={() => handleVote(option.id)}>Vote</button>
                    </h6>
                ))}
            </ul>
        </div>
    );
};

export default RealtimePolling;
