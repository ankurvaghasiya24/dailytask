// 1. Simple Counter: Create a counter app with increment and decrement buttons using 
// useState.

import React, { useState } from 'react';

function Task1() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Number: {count}</h2>
      <button className='btn btn-success' onClick={() => setCount(count + 1)}> + </button>
      <button className='btn btn-danger mx-3' onClick={() => setCount(count - 1)} disabled={count <= 0}> - </button>
    </div>
  );
}

export default Task1;

