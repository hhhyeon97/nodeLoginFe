import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './route/PrivateRoute';
import { useEffect, useState } from 'react';
import api from './utils/api';

function App() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    // getUser의 목표 : 토큰을 통해 유저정보를 가져온다 !
    try {
      const storedToken = sessionStorage.getItem('token');
      if (storedToken) {
        const response = await api.get('/user/me');
        // console.log('response ! ', response);
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/user/logout');
      sessionStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('로그아웃 실패 : ', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoPage user={user} onLogout={handleLogout} />
          </PrivateRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/login"
        element={<LoginPage setUser={setUser} user={user} />}
      />
    </Routes>
  );
}

export default App;
