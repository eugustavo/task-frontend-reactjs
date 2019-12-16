import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import './styles.css';

export default function New({ history }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        async function loadTask() {
            const task_id = localStorage.getItem('task');
            const response = await api.get('/task', { headers: { task_id } });
            setTitle(response.data.title);
            setDescription(response.data.description);
        }
        loadTask();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const user_id = localStorage.getItem('user');
        const task_id = localStorage.getItem('task');

        if(!task_id){
            await api.post('/task', { title, description },
                { headers: { user_id } }
            );
            history.push('/dashboard');
        }
        await api.put('/task', { title, description }, {
            headers: { task_id, user_id }
        });
        history.push('/dashboard');
    }

    return (
        <>
            <header className="new-header">
                <h2>{!localStorage.getItem('task') ? 'Nova Tarefa' : 'Editar Tarefa'}</h2>
            </header>
            <div className="new-task">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Título da tarefa"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        required
                    />

                    <label htmlFor="description">Descrição</label>
                    <input
                        type="text"
                        id="description"
                        placeholder="Descrição da tarefa"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                        required
                    />

                    <button type="submit" className="btn"> {!localStorage.getItem('task') ? 'Adicionar' : 'Atualizar'} </button>
                </form>
            </div>
        </>
    );
}
