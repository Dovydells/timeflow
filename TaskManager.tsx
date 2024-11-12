import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from '../types/task';
import { addTask, deleteTask, toggleTaskCompletion } from '../store/slices/taskSlice';
import { RootState } from '../store';

const TaskManager: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        description: '',
        completed: false,
        projectId: '1',
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 86400000).toISOString(),
        type: 'daily'
      };
      dispatch(addTask(newTask));
      setNewTaskTitle('');
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          aria-label="task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter task title"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTaskCompletion(task.id))}
              aria-label={task.title}
            />
            <span>{task.title}</span>
            <button
              data-testid={`delete-task-${task.id}`}
              onClick={() => dispatch(deleteTask(task.id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager; 