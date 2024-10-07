// 15. Search Filter with Debounce: Implement a debounced search filter using useEffect.


import React, { useState, useEffect } from 'react';

function Task15() {
  const data = ['one', 'two', 'three', 'four', 'five', 'six'];

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]); 


  useEffect(() => {
    if (debouncedTerm) {
      const filtered = data.filter((item) =>
        item.toLowerCase().includes(debouncedTerm.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [debouncedTerm, data]); 

  return (
    <div>
      <h3>Search Filter</h3>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Task15;

