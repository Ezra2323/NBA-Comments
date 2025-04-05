import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">🏀 Basketball Comments</Link>
      </div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Início</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Criar Conta</Link>
      </div>
    </nav>
  );
}
