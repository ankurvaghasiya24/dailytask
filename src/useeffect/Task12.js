// 12. Window Width Resize Listener: Track window resize events using useEffect and update 
// state accordingly.


import React, { useState, useEffect } from 'react';

const Task12 = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  return (
    <div>
      <h1>Window Width: {windowWidth}px</h1>
    </div>
  );
};

export default Task12;
