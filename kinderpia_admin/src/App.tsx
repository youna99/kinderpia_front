import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Groups from './pages/Meetings';
import Reports from './pages/Reports';
import BadPersons from './pages/BadPersons';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<AdminLayout />}>  {/* /admin 대신 / 사용 */}
            <Route index element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="groups" element={<Groups />} />
            <Route path="reports" element={<Reports />} />
            <Route path="blacklist" element={<BadPersons />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
    </div>
  );
}

export default App;