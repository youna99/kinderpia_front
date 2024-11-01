import React from 'react';
import './App.css';
import AdminPage from './pages/AdminPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
