import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Game from './pages/Jogo.jsx';
import Login from './pages/login.jsx';
import Register from './pages/cadastro.jsx';
import Navbar from './components/navbar.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jogo/:id" element={<Game />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
