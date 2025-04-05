// src/pages/Game.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarDays, ChevronLeft, MessageSquare } from 'lucide-react';

export default function Game() {
  const { id } = useParams();
  const [jogo, setJogo] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');

  useEffect(() => {
    // Buscar jogo da API
    fetch(`http://localhost:5000/dias/${id}`)
      .then((res) => res.json())
      .then((data) => setJogo(data))
      .catch((err) => console.error('Erro ao buscar jogo:', err));

    // Buscar comentários relacionados ao jogo
    fetch(`http://localhost:5000/comentarios`)
      .then((res) => res.json())
      .then((data) => {
        const filtrados = data.filter(coment => coment.jogoId == id);
        setComentarios(filtrados);
      })
      .catch((err) => console.error('Erro ao buscar comentários:', err));
  }, [id]);

  const adicionarComentario = () => {
    if (novoComentario.trim()) {
      const comentarioData = {
        jogoId: parseInt(id),
        texto: novoComentario,
      };

      fetch('http://localhost:5000/comentarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comentarioData),
      })
        .then((res) => res.json())
        .then((data) => {
          setComentarios([...comentarios, data]);
          setNovoComentario('');
        })
        .catch((err) => console.error('Erro ao adicionar comentário:', err));
    }
  };

  if (!jogo) return <div className="p-6">Carregando...</div>;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Menu no canto superior direito */}
      <div className="flex justify-end mb-4 space-x-4 text-sm text-blue-600 font-medium">
        <Link to="/" className="hover:underline">Início</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/criar-conta" className="hover:underline">Criar Conta</Link>
      </div>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
        <Link to="/" className="flex items-center text-blue-600 mb-4 hover:underline">
          <ChevronLeft className="w-5 h-5 mr-1" /> Voltar
        </Link>

        <h2 className="text-3xl font-bold mb-2 text-gray-800 text-right">
          {jogo.time_casa} <span className="text-gray-500">vs</span> {jogo.time_fora}
        </h2>

        <div className="flex items-center justify-end text-sm text-gray-600 mb-2">
          <CalendarDays className="w-4 h-4 mr-2" />
          {new Date(jogo.data).toLocaleString()}
        </div>
        <div className="text-sm text-right text-gray-600 mb-1">Local: <span className="font-medium text-gray-800">{jogo.local}</span></div>
        <div className="text-sm text-right text-gray-600 mb-4">Campeonato: <span className="font-medium text-gray-800">{jogo.campeonato}</span></div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-2">
            <MessageSquare className="w-5 h-5 mr-2" /> Comentários
          </h3>
          <div className="space-y-2 mb-4">
            {comentarios.length === 0 && <p className="text-gray-500">Nenhum comentário ainda.</p>}
            {comentarios.map((coment, idx) => (
              <div key={idx} className="bg-gray-100 p-3 rounded-xl border border-gray-200 text-sm">
                {coment.texto}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              placeholder="Escreva um comentário..."
              className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={adicionarComentario}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
