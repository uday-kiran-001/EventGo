import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddEvent from './components/AddEvent';
import Likes from './components/Likes';
import Home from './components/Home';
import { store } from './store/index.js'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login/' element={<Login />} />
          <Route path='/signup/' element={<SignUp />} />
          <Route path='/addevent/' element={<AddEvent />} />
          <Route path='/likes/' element={<Likes />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
