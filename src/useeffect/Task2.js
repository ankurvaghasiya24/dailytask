// 2. Toggle Visibility: Implement a button that do show and hide password functionality as 
// well as implement feature of password must contain at least one Uppercase letter, length 
// must be 8-character, special character and all.


import React, { useState } from 'react';


const Task2 = () => {
    const [showPassword, setShowPassword] = useState(false); 
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState("");  
    

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (!passwordRegex.test(value)) {
            setError("Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number.");
        } else {
            setError("");
        }
    };

    return (
        <div className='col-md-4 mb-5 mt-5'>
            <div className="mb-3 d-flex ">
                <h3 >Password:</h3>
                <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="passwordInput"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <div className='mx-2' onClick={() => setShowPassword(prev => !prev)}>
                    <button>
                        {showPassword ? 'Hide'  : 'Show' } 
                    </button>
                </div>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default Task2;
