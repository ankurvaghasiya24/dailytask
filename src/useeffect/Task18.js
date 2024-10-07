// 18. Geolocation Tracker: Track user's geolocation coordinates and update on movement 
// using useEffect.


import React, { useState, useEffect } from 'react';

const Task18 = () => {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    const handleLocationChange = (position) => {
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const handleError = (err) => {
      setError(err.message);
    };

    navigator.geolocation.getCurrentPosition(handleLocationChange, handleError);

    const watchId = navigator.geolocation.watchPosition(handleLocationChange, handleError);

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div>
      <h1>Geolocation Tracker</h1>
      {error && <p>Error: {error}</p>}
      {coords.latitude && coords.longitude ? (
        <p>
          Latitude: {coords.latitude} <br />
          Longitude: {coords.longitude}
        </p>
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
};

export default Task18;
