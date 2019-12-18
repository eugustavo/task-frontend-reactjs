import React, {useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';
import { FaPlus, FaCheck, FaEdit, FaTrash } from 'react-icons/fa'

import './styles.css';

export default function Dashboard({ history }) {
  const [task, setTask] = useState([]);

  useEffect( () => {
    async function loadTask(){
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', { headers: { user_id }});
      setTask(response.data);
    }
    loadTask();
    localStorage.setItem('task', '');
  }, [task]);

  async function newTask(){
    history.push('/new');
  }

  async function checkTask(task_id){
    const user_id = localStorage.getItem('user');

    await api.delete('/task', {headers: {user_id, task_id}});
    toast.success('Tarefa concluída!');
  }

  async function editTask(task_id){
    localStorage.setItem('task', task_id);
    history.push('/new');
  }

  async function deleteTask(task_id){
    const user_id = localStorage.getItem('user');

    const response = await api.delete('/task', {headers: {user_id, task_id}});
    toast.error(response.data.message);
  }

  return (
    <>
      <ToastContainer />
      <header className="header">
        <h2>Minhas Tarefas</h2>
        <button type="button" onClick={newTask} >
          <div className="button-icon">
            <FaPlus color="#ffffff"/>
          </div>
          Nova tarefa
        </button>
      </header>
      <div className="task-list">
        <ul>
          {task.map(task => (
            <li className="task" key={task._id}>
              <strong>{task.title}</strong>
              <span>{task.description}</span>
              <div className="task-icons">
                <FaCheck  className="check-icon"  onClick={() => checkTask(task._id)} />
                <FaEdit   className="edit-icon"   onClick={() => editTask(task._id)} />
                <FaTrash  className="delete-icon" onClick={() => deleteTask(task._id)}/>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
