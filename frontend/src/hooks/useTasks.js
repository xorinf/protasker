import { useState, useCallback, useMemo } from 'react';
import useLocalStorage from './useLocalStorage';
import { createTask, filterTasks as filterTasksUtil } from '../utils/taskHelpers';

/**
 * Custom hook encapsulating all task management logic
 * 
 * Demonstrates:
 * - State management with useState
 * - Persistence with useLocalStorage
 * - Memoization with useMemo
 * - Callback optimization with useCallback
 * - Custom hook composition
 * 
 * @returns {Object} Task state and actions
 */
function useTasks() {
    // Persisted state (new key to avoid schema conflict)
    const [tasks, setTasks] = useLocalStorage('protasker_react_tasks', []);

    // Data migration: One-time check for legacy data
    useState(() => {
        try {
            const legacy = localStorage.getItem('protasker_tasks');
            const current = localStorage.getItem('protasker_react_tasks');

            // If we have legacy data but no new data, migrate it
            if (legacy && !current) {
                const parsed = JSON.parse(legacy);
                // Legacy format was { tasks: [], nextId: number }
                if (parsed.tasks && Array.isArray(parsed.tasks)) {
                    console.log('Migrating legacy tasks to React app', parsed.tasks);
                    setTasks(parsed.tasks);
                    // Optional: clear legacy
                    // localStorage.removeItem('protasker_tasks'); 
                }
            }
        } catch (e) {
            console.error('Migration failed', e);
        }
    });

    // Local filter state
    const [searchTerm, setSearchTerm] = useState('');

    // Memoized filtered tasks (only recalculates when dependencies change)
    const filteredTasks = useMemo(() => {
        return filterTasksUtil(tasks, searchTerm);
    }, [tasks, searchTerm]);

    // Memoized task ID counter
    const nextId = useMemo(() => {
        return tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    }, [tasks]);

    // Stable callback functions (won't cause unnecessary re-renders)
    const addTask = useCallback((title, priority = 'medium') => {
        if (!title || !title.trim()) return;

        const newTask = createTask(title, priority);
        setTasks((prev) => [...prev, newTask]);
    }, [setTasks]);

    const toggleTask = useCallback((id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }, [setTasks]);

    const deleteTask = useCallback((id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    }, [setTasks]);

    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
    }, []);

    return {
        tasks,
        filteredTasks,
        nextId,
        addTask,
        toggleTask,
        deleteTask,
        handleSearch,
    };
}

export default useTasks;
