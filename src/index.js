import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/container/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <App />
    <Footer />

  </React.StrictMode>
);


