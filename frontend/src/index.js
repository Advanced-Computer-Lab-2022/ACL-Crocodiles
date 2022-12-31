import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CoursesContextProvider } from "./context/CoursesContext";
import { AuthContextProvider } from "./context/AuthContext";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import countryReducer from "./Features/country";
import ratingFilterReducer from "./Features/ratingFilter";
import priceFilterReducer from "./Features/priceFilter";
import subjectFilterReducer from "./Features/subjectFilter";
import SwipableIsOpenReducer from "./Features/swipableIsOpen";
import sortReducer from "./Features/sort";
import searchReducer from "./Features/search";
const store = configureStore({
  reducer: {
    country: countryReducer,
    ratingFilter: ratingFilterReducer,
    priceFilter: priceFilterReducer,
    subjectFilter: subjectFilterReducer,
    SwipableIsOpen: SwipableIsOpenReducer,
    sort: sortReducer,
    search: searchReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);
