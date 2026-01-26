import React from 'react';
import './styles/main.css';

// Components
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import SearchBox from './components/SearchBox';
import Statistics from './components/Statistics';
import TaskList from './components/TaskList';

// Custom hook
import useTasks from './hooks/useTasks';

/**
 * App Component - Root of the application
 * 
 * Demonstrates:
 * - Component composition
 * - Custom hooks usage
 * - Props down, events up pattern
 * - State management
 */
function App() {
    // Custom hook encapsulates all task logic
    const {
        tasks,
        filteredTasks,
        addTask,
        toggleTask,
        deleteTask,
        handleSearch,
    } = useTasks();

    return (
        <div className="app">
            <Header />

            <main className="container">
                {/* Add task form */}
                <TaskForm onAddTask={addTask} />

                {/* Search box with debouncing */}
                <SearchBox onSearch={handleSearch} />

                {/* Statistics (derived from tasks) */}
                <Statistics tasks={tasks} />

                {/* Task list (uses filtered tasks) */}
                <TaskList
                    tasks={filteredTasks}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                />
            </main>

            <footer>
                <p>&copy; 2026 ProTasker — Built with React</p>
            </footer>
        </div>
    );
}

export default App;
