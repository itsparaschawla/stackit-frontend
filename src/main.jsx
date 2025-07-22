import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthProvider'; // ✅ Import context

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>        {/* ✅ Wrap your entire app here */}
      <App />
    </AuthProvider>
  </StrictMode>
);

