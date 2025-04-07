import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Scoreboard from '../components/Scoreboard';
import { auth } from '../auth';
import styled from 'styled-components';


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const LogoutButton = styled.button`
  padding: 6px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }
`;

const PlayersSection = styled.section`
  display: flex;
  gap: 20px;
  margin: 30px 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TeamContainer = styled.div`
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TeamTitle = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 1.2rem;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
`;

const PlayerList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PlayerItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 10px;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9f9f9;
  }
`;

const PlayerNumber = styled.span`
  font-weight: bold;
  color: #555;
`;

const CommentsSection = styled.section`
  margin-top: 40px;
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CommentsTitle = styled.h3`
  margin-bottom: 20px;
  color: #333;
  font-size: 1.4rem;
`;

const CommentsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
`;

const CommentItem = styled.li`
  padding: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
  background-color: #fafafa;
  border-radius: 6px;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const CommentAuthor = styled.strong`
  color: #2c3e50;
`;

const CommentForm = styled.form`
  margin-top: 25px;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const SubmitButton = styled.button`
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0069d9;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.p`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #dc3545;
`;

export default function Game() {
  const { id } = useParams();
  const [jogo, setJogo] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usuarioLogado, setUsuarioLogado] = useState(auth.getCurrentUser());
  const [jogadoresTime1, setJogadoresTime1] = useState([]);
  const [jogadoresTime2, setJogadoresTime2] = useState([]);

  // Carregar dados do jogo, comentários e jogadores
  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);
        const [resJogo, resComentarios] = await Promise.all([
          api.get(`/jogos/${id}`),
          api.get(`/comentarios/dia/${id}`)
        ]);
        
        setJogo(resJogo.data);
        setComentarios(resComentarios.data);
        
        if (resJogo.data.time1 && resJogo.data.time2) {
          const [resJogadoresTime1, resJogadoresTime2] = await Promise.all([
            api.get(`/jogadores/time/nome/${encodeURIComponent(resJogo.data.time1.nome)}`),
            api.get(`/jogadores/time/nome/${encodeURIComponent(resJogo.data.time2.nome)}`)
          ]);
          
          setJogadoresTime1(resJogadoresTime1.data);
          setJogadoresTime2(resJogadoresTime2.data);
        }
      } catch (err) {
        setError(err.message);
        console.error('Erro ao carregar dados:', err);
      } finally {
        setLoading(false);
      }
    }
  
    carregarDados();
  }, [id]);

  // Enviar novo comentário
  async function enviarComentario(e) {
    e.preventDefault();
    if (!novoComentario.trim()) return;

    const usuario = auth.getCurrentUser();
    if (!usuario) {
      alert('Você precisa estar logado para comentar!');
      return;
    }

    try {
      setLoading(true);
      await api.post('/comentarios', {
        id_dia_jogo: id,
        id_usuario: usuario.id,
        comentario: novoComentario
      });

      setNovoComentario('');
      const res = await api.get(`/comentarios/dia/${id}`);
      setComentarios(res.data);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao enviar comentário:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingMessage>Carregando dados do jogo...</LoadingMessage>;
  if (error) return <ErrorMessage>Erro ao carregar dados: {error}</ErrorMessage>;
  if (!jogo) return <LoadingMessage>Nenhum dado do jogo encontrado.</LoadingMessage>;

  return (
    <Container>
      {usuarioLogado && (
        <UserInfo>
          <span>Logado como: <strong>{usuarioLogado.nickname}</strong></span>
          <LogoutButton onClick={() => { auth.logout(); setUsuarioLogado(null); }}>
            Sair
          </LogoutButton>
        </UserInfo>
      )}

      <Scoreboard
        time1={jogo?.time1?.nome}
        time2={jogo?.time2?.nome}
        placar1={jogo?.placar_time1 ?? ''}
        placar2={jogo?.placar_time2 ?? ''}
      />

      {/* Seção de jogadores */}
      <PlayersSection>
        {/* Time 1 */}
        <TeamContainer>
          <TeamTitle>{jogo?.time1?.nome || 'Time 1'}</TeamTitle>
          <PlayerList>
            {jogadoresTime1.map(jogador => (
              <PlayerItem key={jogador.id}>
                <PlayerNumber>{jogador.num_jogador}</PlayerNumber>
                {jogador.nome} {jogador.sobrenome}
              </PlayerItem>
            ))}
          </PlayerList>
        </TeamContainer>

        {/* Time 2 */}
        <TeamContainer>
          <TeamTitle>{jogo?.time2?.nome || 'Time 2'}</TeamTitle>
          <PlayerList>
            {jogadoresTime2.map(jogador => (
              <PlayerItem key={jogador.id}>
                <PlayerNumber>{jogador.num_jogador}</PlayerNumber>
                {jogador.nome} {jogador.sobrenome}
              </PlayerItem>
            ))}
          </PlayerList>
        </TeamContainer>
      </PlayersSection>

      {/* Seção de comentários */}
      <CommentsSection>
        <CommentsTitle>Comentários</CommentsTitle>
        {comentarios.length === 0 ? (
          <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
        ) : (
          <CommentsList>
            {comentarios.map((c) => (
              <CommentItem key={c.id}>
                <CommentAuthor>{c.Usuario?.nome || 'Anônimo'}:</CommentAuthor> {c.comentario}
              </CommentItem>
            ))}
          </CommentsList>
        )}

        <CommentForm onSubmit={enviarComentario}>
          <CommentTextarea
            rows="3"
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            placeholder="Escreva seu comentário..."
            disabled={loading}
          />
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Comentário'}
          </SubmitButton>
        </CommentForm>
      </CommentsSection>
    </Container>
  );
}