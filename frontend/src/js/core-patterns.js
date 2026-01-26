/**
 * CORE PATTERNS — Advanced JavaScript Design Patterns
 * 
 * This module demonstrates fundamental patterns used in modern JavaScript:
 * 1. Module Pattern (IIFE for encapsulation)
 * 2. Factory Functions (object creation without 'new')
 * 3. Constructor Functions (prototypal inheritance)
 * 4. Composition over Inheritance
 * 
 * These patterns form the foundation for understanding how React and modern
 * frameworks structure their code.
 */

// ============================================================================
// 1. MODULE PATTERN — Encapsulation with Private/Public Members
// ============================================================================

/**
 * The Module Pattern uses an IIFE (Immediately Invoked Function Expression)
 * to create a closure that provides private scope.
 * 
 * Benefits:
 * - Private variables (not accessible from outside)
 * - Controlled public API
 * - Namespace management
 * - Memory efficiency (shared across all instances)
 */

const TaskCounter = (function () {
  // PRIVATE STATE (enclosed in closure)
  let count = 0;
  const listeners = [];

  // PRIVATE METHODS (not exposed)
  function notifyListeners() {
    listeners.forEach((callback) => callback(count));
  }

  // PUBLIC API (returned object)
  return {
    increment() {
      count++;
      notifyListeners();
      return count;
    },

    decrement() {
      count--;
      notifyListeners();
      return count;
    },

    getCount() {
      return count;
    },

    reset() {
      count = 0;
      notifyListeners();
    },

    subscribe(callback) {
      listeners.push(callback);
      // Return unsubscribe function
      return () => {
        const index = listeners.indexOf(callback);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      };
    },
  };
})();

// ============================================================================
// 2. FACTORY FUNCTIONS — Object Creation Without 'new'
// ============================================================================

/**
 * Factory functions return objects without using the 'new' keyword.
 * 
 * Benefits:
 * - No 'this' binding issues
 * - True private variables (via closure)
 * - Easier to compose
 * - Can return any type
 */

function createTask(title, priority = 'medium') {
  // PRIVATE STATE (closure-based)
  let completed = false;
  const createdAt = new Date();

  // PRIVATE METHODS
  function validatePriority(pri) {
    const valid = ['low', 'medium', 'high'];
    return valid.includes(pri) ? pri : 'medium';
  }

  // PUBLIC API
  return {
    // Getters
    getTitle() {
      return title;
    },

    getPriority() {
      return priority;
    },

    isCompleted() {
      return completed;
    },

    getAge() {
      return Date.now() - createdAt.getTime();
    },

    // Actions
    toggle() {
      completed = !completed;
      return completed;
    },

    setPriority(newPriority) {
      priority = validatePriority(newPriority);
      return priority;
    },

    // Representation
    toJSON() {
      return {
        title,
        priority,
        completed,
        createdAt: createdAt.toISOString(),
      };
    },
  };
}

// ============================================================================
// 3. CONSTRUCTOR FUNCTIONS — Prototypal Inheritance
// ============================================================================

/**
 * Constructor functions use the 'new' keyword and prototype chain.
 * 
 * Benefits:
 * - Memory efficient (methods shared via prototype)
 * - instanceof works
 * - Traditional OOP pattern
 * 
 * Tradeoffs:
 * - 'this' binding can be confusing
 * - No true private variables (convention: _property)
 */

function Project(name, owner) {
  // Instance properties (unique per object)
  this.name = name;
  this.owner = owner;
  this.tasks = [];
  this.createdAt = new Date();
}

// Methods on prototype (shared across all instances)
Project.prototype.addTask = function (task) {
  this.tasks.push(task);
  return this.tasks.length;
};

Project.prototype.removeTask = function (taskTitle) {
  const index = this.tasks.findIndex((t) => t.getTitle() === taskTitle);
  if (index > -1) {
    this.tasks.splice(index, 1);
    return true;
  }
  return false;
};

Project.prototype.getCompletedTasks = function () {
  return this.tasks.filter((t) => t.isCompleted());
};

Project.prototype.getProgress = function () {
  if (this.tasks.length === 0) return 0;
  const completed = this.getCompletedTasks().length;
  return Math.round((completed / this.tasks.length) * 100);
};

Project.prototype.toJSON = function () {
  return {
    name: this.name,
    owner: this.owner,
    tasks: this.tasks.map((t) => t.toJSON()),
    progress: this.getProgress(),
    createdAt: this.createdAt.toISOString(),
  };
};

// ============================================================================
// 4. COMPOSITION OVER INHERITANCE
// ============================================================================

/**
 * Composition builds complex objects by combining simple behaviors.
 * This is more flexible than inheritance hierarchies.
 * 
 * Benefits:
 * - Avoid fragile base class problem
 * - More flexible and maintainable
 * - Easier to test individual behaviors
 */

// BEHAVIORS (small, focused functions)
const withTimestamps = (obj) => ({
  ...obj,
  createdAt: new Date(),
  updatedAt: new Date(),
  updateTimestamp() {
    this.updatedAt = new Date();
  },
});

const withValidation = (obj) => ({
  ...obj,
  errors: [],
  validate() {
    this.errors = [];
    if (!this.title || this.title.trim().length === 0) {
      this.errors.push('Title is required');
    }
    return this.errors.length === 0;
  },
  isValid() {
    return this.errors.length === 0;
  },
});

const withPersistence = (obj) => ({
  ...obj,
  save() {
    const key = `task_${this.id}`;
    localStorage.setItem(key, JSON.stringify(this));
    return this;
  },
  load(id) {
    const key = `task_${id}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
});

// COMPOSE BEHAVIORS
function createEnhancedTask(id, title) {
  const baseTask = {
    id,
    title,
    completed: false,
  };

  // Compose multiple behaviors
  return withPersistence(withValidation(withTimestamps(baseTask)));
}

// ============================================================================
// DEMO & TESTING
// ============================================================================

function runPatternsDemos() {
  console.log('=== CORE PATTERNS DEMONSTRATION ===\n');

  // 1. Module Pattern Demo
  console.log('1. MODULE PATTERN:');
  console.log('Initial count:', TaskCounter.getCount());
  TaskCounter.increment();
  TaskCounter.increment();
  console.log('After 2 increments:', TaskCounter.getCount());

  // Subscribe to changes
  const unsubscribe = TaskCounter.subscribe((count) => {
    console.log('Counter changed to:', count);
  });

  TaskCounter.increment(); // Will trigger listener
  unsubscribe(); // Stop listening
  TaskCounter.reset();
  console.log('After reset:', TaskCounter.getCount());
  console.log('');

  // 2. Factory Function Demo
  console.log('2. FACTORY FUNCTIONS:');
  const task1 = createTask('Build auth system', 'high');
  const task2 = createTask('Write tests', 'medium');

  console.log('Task 1:', task1.toJSON());
  task1.toggle();
  console.log('Task 1 after toggle:', task1.toJSON());
  console.log('');

  // 3. Constructor Function Demo
  console.log('3. CONSTRUCTOR FUNCTIONS:');
  const project = new Project('ProTasker', 'Senior Dev');
  project.addTask(task1);
  project.addTask(task2);

  console.log('Project progress:', project.getProgress() + '%');
  console.log('Project data:', project.toJSON());
  console.log('');

  // 4. Composition Demo
  console.log('4. COMPOSITION PATTERN:');
  const enhancedTask = createEnhancedTask(1, 'Learn composition');

  console.log('Is valid?', enhancedTask.validate());
  console.log('Task with behaviors:', {
    ...enhancedTask,
    errors: enhancedTask.errors,
  });
  console.log('');

  console.log('=== DEMONSTRATIONS COMPLETE ===');
}

// Export for use in other modules
export { TaskCounter, createTask, Project, createEnhancedTask, runPatternsDemos };
