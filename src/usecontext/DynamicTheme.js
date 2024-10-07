import React, { useState, useContext, useEffect, createContext } from 'react';



const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const [layout, setLayout] = useState(() => {
    return localStorage.getItem('layout') || 'grid';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('layout', layout);
  }, [theme, layout]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, layout, setLayout }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  return useContext(ThemeContext);
};

const DynamicTheme = () => {
  const { theme, setTheme, layout, setLayout } = useTheme();

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleLayout = () => {
    setLayout((prev) => (prev === 'grid' ? 'list' : 'grid'));
  };

  return (
    <div className={`app ${theme} ${layout}`}>
      <header>
        <h1>Dynamic Theme and Layout Switcher</h1>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
        <button onClick={toggleLayout}>
          Switch to {layout === 'grid' ? 'List' : 'Grid'} Layout
        </button>
      </header>
      <main>
        <div className={`content ${layout}`}>
          <p>This is an example content area.</p>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <DynamicTheme />
    </ThemeProvider>
  );
};

export default App;
