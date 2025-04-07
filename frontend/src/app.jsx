import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Game from './pages/Game';
import Login from './pages/Login';
import Register from './pages/Registrer';
import ProtectedRoute from './components/ProtecedRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          { }
          <Route index element={<Home />} />

          { }
          <Route
            path="jogo/:id"
            element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            }
          />

          { }
          <Route path="login" element={<Login />} />
          <Route path="cadastro" element={<Register />} />

          {/* Redirecionamento para rotas não encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}