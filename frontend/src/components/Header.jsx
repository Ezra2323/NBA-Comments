import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{
      padding: '15px',
      backgroundColor: '#222',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1>🏀 NBA Comments</h1>
      <nav>
        <Link to="/" style={{ color: 'white', marginRight: '15px' }}>Home</Link>
        <Link to="/login" style={{ color: 'white', marginRight: '15px' }}>Login</Link>
        <Link to="/cadastro" style={{ color: 'white' }}>Cadastro</Link>
      </nav>
    </header>
  );
}
