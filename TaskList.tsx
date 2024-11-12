import React from 'react';
import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="task-list">
      <h2>Tasks</h2>
      {tasks.map(task => (
        <div key={task.id} className="task-item">
          <h3>{task.title}</h3>
          <p>Status: {task.status}</p>
          {task.startTime && <p>Started: {task.startTime.toLocaleString()}</p>}
          {task.endTime && <p>Completed: {task.endTime.toLocaleString()}</p>}
          <p>Duration: {task.duration}s</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;