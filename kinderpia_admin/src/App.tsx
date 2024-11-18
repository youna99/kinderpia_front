import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Reports from './pages/Reports';
import BadPersons from './pages/BadPersons';
import Meetings from './pages/Meetings';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/admin">  {/* basename 추가 */}
        <Routes>
          <Route path="/" element={<AdminLayout />}>  {/* /admin 대신 / 사용 */}
            <Route index element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="meetings" element={<Meetings />} />
            <Route path="reports" element={<Reports />} />
            <Route path="blacklist" element={<BadPersons />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;