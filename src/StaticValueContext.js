// // StaticValueContext.js
// import React, { createContext, useState } from 'react';

// const StaticValueContext = createContext();

// export const StaticValueProvider = ({ children, staticValue }) => {
//   const [value, setValue] = useState(staticValue);

//   return (
//     <StaticValueContext.Provider value={value}>
//       {children}
//     </StaticValueContext.Provider>
//   );
// };

// export const useStaticValue = () => {
//   return useContext(StaticValueContext);
// };
// StaticValue.js
const staticValue = 'http://localhost:3000/';

export const getStaticValue = () => {
  return staticValue;
};
