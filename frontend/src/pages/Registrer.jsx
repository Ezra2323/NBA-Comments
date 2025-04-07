import { useState } from 'react';
import axios from 'axios';
import { auth } from '../auth';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CadastroContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  padding: 1rem;
`;

const CadastroBox = styled.div`
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

const Subtitle = styled.p`
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #4a5568;
`;

const FormLink = styled(Link)`
  font-weight: 500;
  color: #4299e1;
  &:hover {
    color: #3182ce;
  }
`;

const ErrorAlert = styled.div`
  background-color: #fff5f5;
  border-left: 4px solid #f56565;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
`;

const ErrorIcon = styled.svg`
  flex-shrink: 0;
  height: 1.25rem;
  width: 1.25rem;
  color: #e53e3e;
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
  margin-bottom: 1.5rem;
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

const PasswordHint = styled.p`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #718096;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #3182ce;
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Spinner = styled.svg`
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export default function Cadastro() {
  const [nome, setNome] = useState('');
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
      const novoUsuario = { nome, nickname, senha };
      const res = await axios.post('http://localhost:3000/api/usuarios', novoUsuario);
      auth.login(res.data);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao cadastrar usuário');
      console.error('Erro ao cadastrar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CadastroContainer>
      <CadastroBox>
        <div className="text-center">
          <Title>Crie sua conta</Title>
          <Subtitle>
            Já tem uma conta? <FormLink to="/login">Faça login</FormLink>
          </Subtitle>
        </div>

        {error && (
          <ErrorAlert>
            <ErrorIcon viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </ErrorIcon>
            <ErrorMessage>{error}</ErrorMessage>
          </ErrorAlert>
        )}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              type="text"
              autoComplete="name"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              type="text"
              autoComplete="username"
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Seu nome de usuário"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              autoComplete="new-password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Crie uma senha segura"
            />
            <PasswordHint>Use pelo menos 8 caracteres, incluindo letras e números</PasswordHint>
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner viewBox="0 0 24 24" width="20" height="20">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"></circle>
                  <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" opacity="0.75"></path>
                </Spinner>
                Criando conta...
              </>
            ) : 'Cadastrar'}
          </SubmitButton>
        </Form>
      </CadastroBox>
    </CadastroContainer>
  );
}