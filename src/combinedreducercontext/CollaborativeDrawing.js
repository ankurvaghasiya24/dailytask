import React, { useReducer, useContext, createContext, useRef, useEffect } from 'react';

const initialState = {
  lines: [],
};

const drawingReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_LINE':
      return { ...state, lines: [...state.lines, action.payload] };
    default:
      return state;
  }
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ name: 'User' + Math.floor(Math.random() * 1000) });
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

const CollaborativeDrawing = () => {
  const [state, dispatch] = useReducer(drawingReducer, initialState);
  const canvasRef = useRef(null);
  const user = useContext(UserContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Redraw all lines
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    state.lines.forEach(line => {
      ctx.beginPath();
      ctx.moveTo(line.startX, line.startY);
      ctx.lineTo(line.endX, line.endY);
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.width;
      ctx.stroke();
    });
  }, [state.lines]);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    const line = { startX, startY, endX: startX, endY: startY, color: 'black', width: 2 };
    
    const drawLine = (e) => {
      const endX = e.clientX - rect.left;
      const endY = e.clientY - rect.top;
      line.endX = endX;
      line.endY = endY;
      dispatch({ type: 'ADD_LINE', payload: line });
    };
    
    const mouseUpHandler = () => {
      canvas.removeEventListener('mousemove', drawLine);
      canvas.removeEventListener('mouseup', mouseUpHandler);
    };
    
    canvas.addEventListener('mousemove', drawLine);
    canvas.addEventListener('mouseup', mouseUpHandler);
  };

  return (
    <div>
      <h1>Collaborative Drawing App - {user.name}</h1>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black' }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <CollaborativeDrawing />
    </UserProvider>
  );
};

export default App;
