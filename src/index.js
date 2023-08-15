import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';

// Navigation
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Main from './routes/Main/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:language?/:step?" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
