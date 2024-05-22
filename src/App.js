import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import userViewModel from './viewmodels/UserViewModel';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import UploadView from './views/UploadView';
import SpreadsheetListView from './views/SpreadsheetListView';

const App = observer(() => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        {userViewModel.isAuthenticated ? (
          <>
            <Route path="/spreadsheets" element={<SpreadsheetListView />} />
            <Route path="/upload" element={<UploadView />} />
            <Route path="*" element={<Navigate to="/spreadsheets" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
});

export default App;