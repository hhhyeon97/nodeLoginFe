import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './route/PrivateRoute';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const token = sessionStorage.getItem('token');
      // const response = api.get("/user/???")
    } catch (error) {}
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoPage />
          </PrivateRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
