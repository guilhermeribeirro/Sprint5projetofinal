import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Convite = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(false);
  const [email, setEmail] = useState('');
  const [Senha, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://localhost:7217/api/Usuarios/AdicionarUsuario', { email, Senha });
      const userId = response.data.idUsuario;
      await axios.post('https://localhost:7217/api/Email/UsarTokenConvite', { token, userId });
      alert('Cadastro e adição ao grupo com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      alert('Erro ao registrar usuário');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:7217/api/Usuarios/Login', { email, Senha });
      const userId = response.data.idUsuario;
      await axios.post('https://localhost:7217/api/Email/UsarTokenConvite', { token, userId });
      alert('Login e adição ao grupo com sucesso!');
      navigate('/grupo');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login');
    }
  };

  return (
    <div>
      <h1>Convite</h1>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={Senha}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleRegister}>Cadastrar</button>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Convite;
