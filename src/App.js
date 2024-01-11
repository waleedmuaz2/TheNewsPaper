import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import News from './components/News';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/Signup';
import Header from './components/Layout/Header';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/news" element={<PrivateRoute><News/></PrivateRoute>} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;