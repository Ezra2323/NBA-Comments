import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h2`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background-color: #3498db;
  }
`;

const GamesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 20px;
`;

const GameCard = styled.li`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  border-left: 4px solid #3498db;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Teams = styled.div`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #2c3e50;
`;

const Time = styled.strong`
  color: #3498db;
`;

const DateInfo = styled.div`
  color: #7f8c8d;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
`;

const DetailsLink = styled(Link)`
  display: inline-block;
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
`;

export default function Home() {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJogos() {
      try {
        const response = await api.get('/jogos');
        setJogos(response.data);
      } catch (error) {
        console.error('Erro ao buscar jogos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchJogos();
  }, []);

  return (
    <Container>
      <Title> Jogos</Title>
      
      {loading ? (
        <LoadingMessage>Carregando jogos...</LoadingMessage>
      ) : (
        <GamesList>
          {jogos.map((jogo) => (
            <GameCard key={jogo.id}>
              <Teams>
                <Time>{jogo.time1?.nome}</Time> vs <Time>{jogo.time2?.nome}</Time>
              </Teams>
              <DateInfo>
                <span>⏰</span>
                {new Date(jogo.data).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </DateInfo>
              <DetailsLink to={`/jogo/${jogo.id}`}>
                Ver detalhes
              </DetailsLink>
            </GameCard>
          ))}
        </GamesList>
      )}
    </Container>
  );
}