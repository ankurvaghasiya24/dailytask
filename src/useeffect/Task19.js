// 19. Lazy Load Images on Scroll: Implement lazy loading for images using useEffect and 
// state.


import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';

const Task19 = () => {
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=15');
        const data = await response.json();
        setTexts(data.map(item => item.title));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {texts.map((text, index) => (
        <div key={index} style={{ margin: '20px 0' }}>
          <LazyLoad height={50} offset={100}>
            <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
              {text}
            </div>
          </LazyLoad>
        </div>
      ))}
    </div>
  );
};

export default Task19;

