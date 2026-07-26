import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DemoLauncher from './components/DemoLauncher';
import DataAccessAuthDemo from './components/DataAccessAuthDemo';
import FinancialAuthDemo from './components/FinancialAuthDemo';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DemoLauncher />} />
          <Route path="/healthcare" element={<DataAccessAuthDemo />} />
          <Route path="/financial" element={<FinancialAuthDemo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
