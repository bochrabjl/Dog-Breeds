import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker'; // Import service worker

const root = ReactDOM.createRoot(document.getElementById('root')); 

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);


reportWebVitals(console.log); // Pass a function to log results or send to an analytics endpoint

// Unregister the service worker for development
serviceWorker.unregister();
