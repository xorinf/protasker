import React from 'react';

/**
 * TaskItem Component
 * 
 * Demonstrates:
 * - Props destructuring
 * - Event handlers
 * - Conditional CSS classes
 * - Data attributes
 */
function TaskItem({ task, onToggle, onDelete }) {
    const { id, title, completed, priority } = task;

    return (
        <li className={`task-item ${completed ? 'completed' : ''}`} data-id={id}>
            <div className="task-content">
                <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={completed}
                    onChange={() => onToggle(id)}
                />
                <span className="task-title">{title}</span>
                <span className={`task-priority priority-${priority}`}>{priority}</span>
            </div>
            <div className="task-actions">
                <button
                    className="btn-delete"
                    onClick={() => onDelete(id)}
                    aria-label="Delete task"
                >
                    ×
                </button>
            </div>
        </li>
    );
}

export default TaskItem;
