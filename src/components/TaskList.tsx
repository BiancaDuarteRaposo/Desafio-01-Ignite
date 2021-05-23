import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [lastId, setlastId] = useState<number>(0);

  function handleCreateNewTask() {
    if (newTaskTitle != "") {
      let id = lastId + 1;
      setTasks([...tasks, { isComplete: false, title: newTaskTitle, id }])
      setlastId(id);
    }
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
  }

  function handleToggleTaskCompletion(id: number) {
    var tasks2 = tasks.slice(0);
    for (let i = 0; i < tasks2.length; i++) {
      if (tasks2[i].id === id) {
        tasks2[i].isComplete = !tasks2[i].isComplete;
      }
    }
    setTasks(tasks2);
  }

  function handleRemoveTask(id: number) {

    var tasks2 = tasks.slice(0);

    // Fazer uma copia das tasks
    const i = tasks.findIndex(task => task.id === id);
    // Através do Indice (i) remover
    tasks2.splice(i, 1);
    setTasks(tasks2);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}