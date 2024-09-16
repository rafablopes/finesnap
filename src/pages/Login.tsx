import React from 'react';
import { auth } from '../firebase'; // Certifique-se de que o caminho está correto
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import '../styles/Login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      console.log('Iniciando login com Google...');
      const result = await signInWithPopup(auth, provider);
      console.log('Login bem-sucedido:', result.user);
      onLogin(); // Chama a função onLogin após o login bem-sucedido
    } catch (error) {
      console.error('Erro ao fazer login: ', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <button className="google-login-button" onClick={handleLogin}>
        Login com Google
      </button>
    </div>
  );
};

export default Login;
