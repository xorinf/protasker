/**
 * APP.JS — Interactive Task Manager Demo
 * 
 * This application demonstrates all the patterns learned in Phase 4:
 * - Module pattern for app structure
 * - Factory functions for creating tasks
 * - DOM utilities for manipulation
 * - Event delegation for efficient handling
 * - Debounce for search optimization
 * - Local storage for persistence
 * 
 * This is a bridge between vanilla JS and React - understanding these
 * patterns will make React's architecture make perfect sense.
 */

// Import utilities (in browser, these would be loaded via script tags)
// For now, we'll reference them as globals

// ============================================================================
// APP MODULE — Main Application Logic
// ============================================================================

const TaskManager = (function () {
    // PRIVATE STATE
    let tasks = [];
    let filteredTasks = [];
    let nextId = 1;

    // DOM REFERENCES (cached for performance)
    const elements = {
        taskForm: null,
        taskInput: null,
        searchInput: null,
        taskList: null,
        statsContainer: null,
    };

    // ============================================================================
    // PRIVATE METHODS
    // ============================================================================

    function initializeDOM() {
        elements.taskForm = document.getElementById('task-form');
        elements.taskInput = document.getElementById('task-input');
        elements.searchInput = document.getElementById('search-input');
        elements.taskList = document.getElementById('task-list');
        elements.statsContainer = document.getElementById('stats');
    }

    function loadFromStorage() {
        const stored = localStorage.getItem('protasker_tasks');
        if (stored) {
            const data = JSON.parse(stored);
            tasks = data.tasks || [];
            nextId = data.nextId || 1;
            filteredTasks = [...tasks];
        }
    }

    function saveToStorage() {
        const data = {
            tasks,
            nextId,
        };
        localStorage.setItem('protasker_tasks', JSON.stringify(data));
    }

    function createTaskElement(task) {
        const taskEl = document.createElement('li');
        taskEl.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskEl.dataset.id = task.id;

        taskEl.innerHTML = `
      <div class="task-content">
        <input type="checkbox" 
               class="task-checkbox" 
               ${task.completed ? 'checked' : ''}>
        <span class="task-title">${escapeHtml(task.title)}</span>
        <span class="task-priority priority-${task.priority}">${task.priority}</span>
      </div>
      <div class="task-actions">
        <button class="btn-delete" aria-label="Delete task">×</button>
      </div>
    `;

        return taskEl;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function renderTasks() {
        if (!elements.taskList) return;

        // Clear existing tasks
        elements.taskList.innerHTML = '';

        // Render filtered tasks
        if (filteredTasks.length === 0) {
            elements.taskList.innerHTML =
                '<li class="empty-state">No tasks found. Add one above!</li>';
            return;
        }

        filteredTasks.forEach((task) => {
            const taskEl = createTaskElement(task);
            elements.taskList.appendChild(taskEl);
        });

        updateStats();
    }

    function updateStats() {
        if (!elements.statsContainer) return;

        const total = tasks.length;
        const completed = tasks.filter((t) => t.completed).length;
        const pending = total - completed;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

        elements.statsContainer.innerHTML = `
      <div class="stat">
        <span class="stat-label">Total:</span>
        <span class="stat-value">${total}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Completed:</span>
        <span class="stat-value">${completed}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Pending:</span>
        <span class="stat-value">${pending}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Progress:</span>
        <span class="stat-value">${progress}%</span>
      </div>
    `;
    }

    function addTask(title, priority = 'medium') {
        const task = {
            id: nextId++,
            title: title.trim(),
            priority,
            completed: false,
            createdAt: new Date().toISOString(),
        };

        tasks.push(task);
        filteredTasks = [...tasks];
        saveToStorage();
        renderTasks();

        return task;
    }

    function toggleTask(id) {
        const task = tasks.find((t) => t.id === id);
        if (task) {
            task.completed = !task.completed;
            saveToStorage();
            renderTasks();
        }
    }

    function deleteTask(id) {
        tasks = tasks.filter((t) => t.id !== id);
        filteredTasks = filteredTasks.filter((t) => t.id !== id);
        saveToStorage();
        renderTasks();
    }

    function filterTasks(searchTerm) {
        const term = searchTerm.toLowerCase().trim();

        if (!term) {
            filteredTasks = [...tasks];
        } else {
            filteredTasks = tasks.filter((task) =>
                task.title.toLowerCase().includes(term)
            );
        }

        renderTasks();
    }

    // Debounced search (wait 300ms after typing stops)
    const debouncedFilter = debounce(filterTasks, 300);

    function handleFormSubmit(e) {
        e.preventDefault();

        const title = elements.taskInput.value.trim();
        if (!title) return;

        addTask(title);
        elements.taskInput.value = '';
        elements.taskInput.focus();
    }

    function handleTaskListClick(e) {
        const taskItem = e.target.closest('.task-item');
        if (!taskItem) return;

        const taskId = parseInt(taskItem.dataset.id, 10);

        // Handle checkbox toggle
        if (e.target.classList.contains('task-checkbox')) {
            toggleTask(taskId);
        }

        // Handle delete button
        if (e.target.classList.contains('btn-delete')) {
            deleteTask(taskId);
        }
    }

    function handleSearchInput(e) {
        const searchTerm = e.target.value;
        debouncedFilter(searchTerm);
    }

    function setupEventListeners() {
        // Form submission (direct event)
        elements.taskForm.addEventListener('submit', handleFormSubmit);

        // Task list interactions (event delegation)
        elements.taskList.addEventListener('click', handleTaskListClick);

        // Search input (debounced)
        elements.searchInput.addEventListener('input', handleSearchInput);
    }

    // ============================================================================
    // PUBLIC API
    // ============================================================================

    return {
        init() {
            initializeDOM();
            loadFromStorage();
            setupEventListeners();
            renderTasks();
            console.log('Task Manager initialized');
        },

        // Expose for debugging
        getTasks() {
            return tasks;
        },

        getStats() {
            return {
                total: tasks.length,
                completed: tasks.filter((t) => t.completed).length,
                pending: tasks.filter((t) => !t.completed).length,
            };
        },
    };
})();

// ============================================================================
// INITIALIZATION
// ============================================================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        TaskManager.init();
    });
} else {
    TaskManager.init();
}

// For debugging in console
window.TaskManager = TaskManager;
