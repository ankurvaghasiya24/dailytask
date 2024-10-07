// 6. Like Button with Count: Implement a 'Like' button that increases a like count using 
// useState.


import React, { useState } from 'react'

function Task6() {

    const [count, setCount] = useState(false);

  return (
    <div className='d-flex'>
      <i class="fa-regular fa-thumbs-up" onClick={() => setCount(count+1)} style={{fontSize:'40px'}}></i>
      <h5>{count}</h5>
    </div>
  )
}

export default Task6
