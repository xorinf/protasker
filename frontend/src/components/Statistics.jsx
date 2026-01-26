import React, { useMemo } from 'react';
import { calculateStats } from '../utils/taskHelpers';

/**
 * Statistics Component
 * 
 * Demonstrates:
 * - useMemo for expensive calculations
 * - Derived state (computed from props)
 * - JSX expressions
 */
function Statistics({ tasks }) {
    // Memoized calculation - only recomputes when tasks changes
    const stats = useMemo(() => calculateStats(tasks), [tasks]);

    return (
        <section className="stats-section">
            <h3>Statistics</h3>
            <div id="stats" className="stats-grid">
                <div className="stat">
                    <span className="stat-label">Total:</span>
                    <span className="stat-value">{stats.total}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Completed:</span>
                    <span className="stat-value">{stats.completed}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Pending:</span>
                    <span className="stat-value">{stats.pending}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Progress:</span>
                    <span className="stat-value">{stats.progress}%</span>
                </div>
            </div>
        </section>
    );
}

export default Statistics;
