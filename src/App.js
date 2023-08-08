import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/UserSlice';
import RegistrationForm from './components/RegistrationForm';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Registration Form</h1>
        <RegistrationForm />
      </div>
    </Provider>
  );
};

export default App;
