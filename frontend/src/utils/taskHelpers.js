/**
 * Task creation factory
 */
export function createTask(title, priority = 'medium') {
    return {
        id: Date.now() + Math.random(), // Simple unique ID
        title: title.trim(),
        priority,
        completed: false,
        createdAt: new Date().toISOString(),
    };
}

/**
 * Calculate statistics from tasks array
 */
export function calculateStats(tasks) {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, progress };
}

/**
 * Filter tasks by search term
 */
export function filterTasks(tasks, searchTerm) {
    if (!searchTerm) return tasks;

    const term = searchTerm.toLowerCase().trim();
    return tasks.filter((task) => task.title.toLowerCase().includes(term));
}

/**
 * Validate priority value
 */
export function validatePriority(priority) {
    const validPriorities = ['low', 'medium', 'high'];
    return validPriorities.includes(priority) ? priority : 'medium';
}
