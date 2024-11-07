import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Groups from './pages/Meetings';
import Reports from './pages/Reports';
import BadPersons from './pages/BadPersons';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="groups" element={<Groups />} />
            <Route path="reports" element={<Reports />} />
            <Route path="blacklist" element={<BadPersons />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;