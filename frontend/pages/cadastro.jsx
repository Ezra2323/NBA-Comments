// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../src/services/api';

export default function Home() {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    async function fetchJogos() {
      try {
        const response = await api.get('/dias-de-jogo'); // exemplo de rota
        setJogos(response.data);
      } catch (err) {
        console.error('Erro ao buscar jogos:', err);
      }
    }

    fetchJogos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Próximos Jogos</h1>
      <div className="grid gap-4">
        {jogos.map((jogo) => (
          <Link 
            to={`/jogo/${jogo.id}`} 
            key={jogo.id} 
            className="p-4 rounded-xl shadow bg-white hover:bg-gray-100 transition"
          >
            <div className="text-lg font-semibold">
              {jogo.time_casa} vs {jogo.time_fora}
            </div>
            <div className="text-sm text-gray-600">
              {new Date(jogo.data).toLocaleString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// src/pages/Game.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../src/services/api';

export default function Game() {
  const { id } = useParams();
  const [jogo, setJogo] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');

  useEffect(() => {
    async function fetchGameData() {
      try {
        const response = await api.get(`/dias-de-jogo/${id}`);
        setJogo(response.data);

        const comentariosRes = await api.get(`/comentarios/${id}`);
        setComentarios(comentariosRes.data);
      } catch (err) {
        console.error('Erro ao carregar jogo:', err);
      }
    }
    fetchGameData();
  }, [id]);

  async function enviarComentario(e) {
    e.preventDefault();
    try {
      await api.post(`/comentarios/${id}`, { comentario: novoComentario });
      setComentarios([...comentarios, { comentario: novoComentario }]);
      setNovoComentario('');
    } catch (err) {
      console.error('Erro ao enviar comentário:', err);
    }
  }

  if (!jogo) return <div>Carregando...</div>;

  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">{jogo.time_casa} vs {jogo.time_fora}</h2>
        <div className="flex justify-center items-center gap-8">
          <img src={`/logos/${jogo.time_casa}.png`} alt="logo time casa" className="w-20 h-20" />
          <span className="text-xl font-semibold">{jogo.placar_casa} : {jogo.placar_fora}</span>
          <img src={`/logos/${jogo.time_fora}.png`} alt="logo time fora" className="w-20 h-20" />
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-xl mb-4">
        <h3 className="text-lg font-semibold mb-2">Comentários</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {comentarios.map((c, i) => (
            <div key={i} className="bg-white p-2 rounded shadow">
              {c.comentario}
            </div>
          ))}
        </div>

        <form onSubmit={enviarComentario} className="mt-4">
          <textarea
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            className="w-full p-2 rounded border"
            placeholder="Escreva seu comentário..."
          />
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

// src/pages/Login.jsx
import { useState } from 'react';
import api from '../src/services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post('/usuarios/login', { email, senha });
      localStorage.setItem('token', response.data.token); // caso use JWT
      navigate('/');
    } catch (err) {
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Entrar na Conta</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Entrar
        </button>
      </form>
    </div>
  );
}

// src/pages/Register.jsx
import { useState } from 'react';
import api from '../src/services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [nome, setNome] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await api.post('/usuarios', { nome, nickname, email, senha });
      alert('Conta criada com sucesso!');
      navigate('/login');
    } catch (err) {
      alert('Erro ao criar conta.');
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Criar Conta</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Nickname"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Criar Conta
        </button>
      </form>
    </div>
  );
}
