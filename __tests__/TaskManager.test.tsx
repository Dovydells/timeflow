import { render, screen, fireEvent, waitFor } from '../../utils/testUtils';
import TaskManager from '../TaskManager';
import { mockTasks } from '../../mocks/taskMocks';
import { RootState } from '../../types/store';

describe('TaskManager Component', () => {
  const initialState = {
    tasks: {
      tasks: mockTasks,
      status: 'idle' as const,
      error: null,
    },
    projects: {
      projects: [],
      status: 'idle' as const,
      error: null,
    },
    focus: {
      isActive: false,
      currentProjectId: null,
      startTime: null,
      duration: 0,
    },
    analytics: {
      appUsage: [],
      dailyStats: {
        totalFocusTime: 0,
        completedTasks: 0,
        productiveApps: [],
      },
      status: 'idle' as const,
      error: null,
    },
  } as RootState;

  it('renders task list correctly', () => {
    render(<TaskManager />, { preloadedState: initialState });
    mockTasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
  });

  it('allows adding new tasks', async () => {
    render(<TaskManager />, { preloadedState: initialState });
    
    const titleInput = screen.getByLabelText(/task title/i);
    fireEvent.change(titleInput, { target: { value: 'New Test Task' } });
    
    const addButton = screen.getByRole('button', { name: /add task/i });
    fireEvent.click(addButton);
    
    await waitFor(() => {
      expect(screen.getByText('New Test Task')).toBeInTheDocument();
    });
  });

  it('supports task completion toggle', async () => {
    render(<TaskManager />, { preloadedState: initialState });
    
    const taskCheckbox = screen.getByRole('checkbox', { name: mockTasks[0].title });
    fireEvent.click(taskCheckbox);
    
    await waitFor(() => {
      expect(taskCheckbox).toBeChecked();
    });
  });

  it('handles task deletion', async () => {
    render(<TaskManager />, { preloadedState: initialState });
    
    const deleteButton = screen.getByTestId(`delete-task-${mockTasks[0].id}`);
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.queryByText(mockTasks[0].title)).not.toBeInTheDocument();
    });
  });
});