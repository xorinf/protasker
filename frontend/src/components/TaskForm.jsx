import React, { useState } from 'react';

/**
 * TaskForm Component
 * 
 * Demonstrates:
 * - Controlled input (value tied to state)
 * - Event handlers
 * - Form submission
 * - Props callback pattern
 */
function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.trim()) {
            onAddTask(title);
            setTitle(''); // Clear input after adding
        }
    };

    return (
        <section className="task-input-section">
            <h2>Add New Task</h2>
            <form id="task-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        id="task-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What needs to be done?"
                        autocomplete="off"
                        required
                    />
                    <button type="submit" className="btn-primary">
                        Add Task
                    </button>
                </div>
            </form>
        </section>
    );
}

export default TaskForm;
