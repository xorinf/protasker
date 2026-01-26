import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import Statistics from '../components/Statistics';
import { Link } from 'react-router-dom';

/**
 * Dashboard Page
 * 
 * Overview of application state.
 * Demonstrates sharing global state (TaskContext) across different pages.
 */
function Dashboard() {
    const { tasks } = useTaskContext();

    // Get recent tasks (last 5)
    const recentTasks = [...tasks]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    return (
        <div className="dashboard-page">
            <h2>Dashboard</h2>

            <div className="dashboard-grid">
                <div className="stats-card-container">
                    <Statistics tasks={tasks} />
                </div>

                <div className="recent-activity">
                    <h3>Recent Activity</h3>
                    {recentTasks.length === 0 ? (
                        <p className="empty-text">No recent activity.</p>
                    ) : (
                        <ul className="recent-list">
                            {recentTasks.map(task => (
                                <li key={task.id} className="recent-item">
                                    <span className={`status-dot ${task.completed ? 'completed' : 'pending'}`}></span>
                                    <span className="task-name">{task.title}</span>
                                    <span className="task-time">
                                        {new Date(task.createdAt).toLocaleDateString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="dashboard-actions">
                        <Link to="/tasks" className="btn-primary">Manage Tasks</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
