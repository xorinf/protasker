import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import SearchBox from '../components/SearchBox';

/**
 * Tasks Page
 * 
 * The main task management interface.
 * Consumes data from TaskContext instead of props.
 */
function Tasks() {
    const { filteredTasks, addTask, toggleTask, deleteTask, handleSearch } = useTaskContext();

    return (
        <div className="tasks-page">
            <div className="page-header">
                <h2>My Tasks</h2>
            </div>

            <div className="tasks-controls">
                <TaskForm onAddTask={addTask} />
                <SearchBox onSearch={handleSearch} />
            </div>

            <TaskList
                tasks={filteredTasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
            />
        </div>
    );
}

export default Tasks;
