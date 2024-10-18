import React, { useReducer } from 'react';
import AppContext from './AppContext';

const authState = { body: null };

const updateAuthDataReducer = (state, action) => {
  switch (action.type) {
    case 'USER_AUTH_DATA':
      authState.body = action.userAuthData;
      return authState;
    default:
      return authState;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(updateAuthDataReducer, authState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;