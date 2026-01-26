import React, { createContext, useContext } from 'react';
import useTasks from '../hooks/useTasks';

// Create Context
const TaskContext = createContext(null);

/**
 * TaskProvider Component
 * 
 * Provides task state and actions to the entire application.
 * Wraps the existing useTasks hook for separation of concerns.
 */
export function TaskProvider({ children }) {
    const taskData = useTasks();

    return (
        <TaskContext.Provider value={taskData}>
            {children}
        </TaskContext.Provider>
    );
}

/**
 * Custom hook to use TaskContext
 */
export function useTaskContext() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
}
