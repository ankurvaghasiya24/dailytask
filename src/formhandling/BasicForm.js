// import React, { useState } from 'react'

// function BasicForm() {

//     const [ name, setName ] = useState('');
//     const [ password, setPassword ] = useState('');


//     function handleSubmit(){
//             console.log(name);
//             console.log(password);
//     }


//   return (
//     <div>
//         <label>
//         User Name : 
//             <input type='text' placeholder='user name' value={name} 
//             required
//             onChange={(e) => setName(e.target.value)} 
//             />
//         </label>
//         <label>
//         Password : 
//             <input type='password' placeholder='password' value={password} 
//             required
//             onChange={(e) => setPassword(e.target.value)}
//             />
//         </label>

//         <button className='btn btn-primary' type='submit' onClick={handleSubmit} >submit</button>
//     </div>
//   )
// }

// export default BasicForm;


import React, { useState } from 'react';

function BasicForm() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        const passwordRegex = /^.{8,}$/;

        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long.');
            return; 
        }

        setError('');
        console.log(name);
        console.log(password);
    }

    return (
        <div className='container col-md-4'>
            <form onSubmit={handleSubmit}>
                <label>
                    User Name: 
                    <input type='text' placeholder='user name' value={name} required onChange={(e) => setName(e.target.value)}/>
                </label>
                <label>
                    Password: 
                    <input type='password' placeholder='password' value={password} required onChange={(e) => setPassword(e.target.value)}/>
                </label>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button className='btn btn-primary mx-2' type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default BasicForm;
