// 8. Character Counter: Create an input field with live character count using useState.

import React, { useState } from 'react';

const Task8 = () => {
  const [text, setText] = useState('');

  const handleChange = (e) => {setText(e.target.value)};

  return (
    <div>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Type something..."
        rows="5"
        cols="30"
      />
      <div>
        Characters: {text.length}
      </div>
    </div>
  );
};

export default Task8;





















// import React, { useState } from 'react';

// const Task8 = () => {
//   const [text, setText] = useState('');

//   const handleChange = (e) => {
//     setText(e.target.value);
//   };

//   return (
//     <div>
//       <textarea value={text} onChange={handleChange} placeholder="Type something..." rows="5" cols="30"/>
//       <div>
//         Characters: {text.replace(/\s/g, '').length}
//       </div>
//     </div>
//   );
// };

// export default Task8;

