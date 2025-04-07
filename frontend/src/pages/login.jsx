import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../auth';
import styled from 'styled-components';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  padding: 1rem;
`;

const LoginBox = styled.div`
  max-width: 28rem;
  width: 100%;
  background: white;
  padding: 2.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 800;
  color: #1a202c;
`;

const ErrorAlert = styled.div`
  background-color: #fff5f5;
  border-left: 4px solid #f56565;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
`;

const ErrorMessage = styled.p`
  margin-left: 0.75rem;
  font-size: 0.875rem;
  color: #c53030;
`;

const Form = styled.form`
  margin-top: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    border-color: #4299e1;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #3182ce;
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export default function Login() {
  const [nickname, setNickname] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:3000/api/usuarios/login', {
        nickname,
        senha
      });

      if (res.data) {
        auth.login(res.data);
        navigate('/'); // Redireciona para a página inicial
      } else {
        throw new Error('Resposta inválida do servidor');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError(error.response?.data?.error || 
               'Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>Login</Title>
        
        {error && (
          <ErrorAlert>
            <ErrorMessage>{error}</ErrorMessage>
          </ErrorAlert>
        )}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nickname</Label>
            <Input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Seu nickname"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Senha</Label>
            <Input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Sua senha"
              required
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar'}
          </SubmitButton>
        </Form>
      </LoginBox>
    </LoginContainer>
  );
}