// 5. Switch Between Themes: Create a dark/light mode toggle using useState


import React, { useState } from 'react';

const Task5 = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'app dark' : 'app light'}>
      <h1>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</h1>
      <button onClick={toggleTheme}>
           {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
};

export default Task5;
