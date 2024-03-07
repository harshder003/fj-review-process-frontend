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
const staticValue = 'https://moral-terrapin-adequate.ngrok-free.app/';

export const getStaticValue = () => {
  return staticValue;
};
