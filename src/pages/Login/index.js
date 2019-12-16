import React, { useState } from 'react';

import api from '../../services/api';

export default function Login({ history }) {
  const [email, setEmail] = useState('');

  async function handleLogin(event){
    event.preventDefault();

    const response = await api.post('/session', { email });
    const { _id } = response.data;
    localStorage.setItem('user', _id);
    history.push('/dashboard');
  }

  return (
    <>
      <p>
        Crie suas <strong>tarefas</strong> e nunca mais esqueça das coisas :D
      </p>

      <form onSubmit={handleLogin}>
        <label htmlFor="email"> E-MAIL </label>
        <input 
          type="email"
          id="email"
          placeholder="example@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="btn"> Entrar </button>
      </form>

    </>
  );
}
