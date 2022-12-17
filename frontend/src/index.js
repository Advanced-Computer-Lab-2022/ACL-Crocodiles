import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CoursesContextProvider } from './context/CoursesContext';
import { AuthContextProvider } from './context/AuthContext';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import countryReducer from './Features/country'

const store = configureStore({
  reducer: {
    country: countryReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      
      <Provider store={store}>
       <AuthContextProvider>
       <App />
      
       </AuthContextProvider>
       </Provider>

  </React.StrictMode>
);

