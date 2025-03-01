import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Correct component name
import "./index.css"
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Use BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
