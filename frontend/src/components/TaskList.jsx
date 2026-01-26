import React from 'react';
import TaskItem from './TaskItem';

/**
 * TaskList Component
 * 
 * Demonstrates:
 * - List rendering with .map()
 * - Key prop for list items
 * - Conditional rendering
 * - Component composition
 * - Props passing to children
 */
function TaskList({ tasks, onToggle, onDelete }) {
    // Empty state
    if (tasks.length === 0) {
        return (
            <section className="task-list-section">
                <h3>Your Tasks</h3>
                <ul id="task-list" className="task-list">
                    <li className="empty-state">No tasks found. Add one above!</li>
                </ul>
            </section>
        );
    }

    // Render task list
    return (
        <section className="task-list-section">
            <h3>Your Tasks</h3>
            <ul id="task-list" className="task-list">
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))}
            </ul>
        </section>
    );
}

export default TaskList;
