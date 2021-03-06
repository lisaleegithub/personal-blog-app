import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import reportWebVitals from './reportWebVitals';
import Welcome from "./Routes/Welcome";
import About from './Routes/About';
import Create from "./Routes/Create";
import Contact from "./Routes/Contact";


ReactDOM.render(
  <Router>
    <Routes>
        <Route path="/" element={<App />}>
        <Route path="/" element={<Welcome />} />
        <Route path="about" element={<About />} />
        <Route path="create" element={<Create />} />
        <Route path="create" element={<Welcome />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
