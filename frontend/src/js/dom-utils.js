/**
 * DOM UTILITIES — Modern DOM Manipulation Patterns
 * 
 * Professional-grade utility functions for working with the DOM:
 * 1. Element creation and manipulation
 * 2. Event delegation
 * 3. Class management
 * 4. Data attribute handling
 * 
 * These patterns are used extensively in frameworks like React (under the hood)
 * and understanding them will make you a better developer.
 */

// ============================================================================
// 1. ELEMENT CREATION & MANIPULATION
// ============================================================================

/**
 * Create a DOM element with attributes and children
 * 
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Element attributes and properties
 * @param {Array|string} children - Child elements or text content
 * @returns {HTMLElement}
 * 
 * Example:
 *   createElement('div', { class: 'card', id: 'task-1' }, [
 *     createElement('h3', {}, 'Task Title'),
 *     createElement('p', {}, 'Task description')
 *   ])
 */
function createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);

    // Set attributes and properties
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'class') {
            element.className = value;
        } else if (key === 'dataset') {
            // Handle data-* attributes
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                element.dataset[dataKey] = dataValue;
            });
        } else if (key.startsWith('on') && typeof value === 'function') {
            // Handle event listeners
            const eventName = key.substring(2).toLowerCase();
            element.addEventListener(eventName, value);
        } else {
            element.setAttribute(key, value);
        }
    });

    // Append children
    const childArray = Array.isArray(children) ? children : [children];
    childArray.forEach((child) => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof HTMLElement) {
            element.appendChild(child);
        }
    });

    return element;
}

/**
 * Query selector with error handling
 * 
 * @param {string} selector - CSS selector
 * @param {HTMLElement} parent - Parent element (default: document)
 * @returns {HTMLElement|null}
 */
function $(selector, parent = document) {
    return parent.querySelector(selector);
}

/**
 * Query selector all with array conversion
 * 
 * @param {string} selector - CSS selector
 * @param {HTMLElement} parent - Parent element (default: document)
 * @returns {Array<HTMLElement>}
 */
function $$(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
}

// ============================================================================
// 2. EVENT DELEGATION
// ============================================================================

/**
 * Event delegation pattern for efficient event handling
 * 
 * Why use delegation?
 * - Attach one listener instead of many
 * - Works for dynamically added elements
 * - Better memory usage
 * - Easier cleanup
 * 
 * @param {HTMLElement} parent - Parent element to attach listener to
 * @param {string} selector - CSS selector for target elements
 * @param {string} eventType - Event type (click, change, etc.)
 * @param {Function} handler - Event handler function
 * @returns {Function} Cleanup function to remove listener
 */
function delegate(parent, selector, eventType, handler) {
    const listener = (event) => {
        // Find the closest element matching the selector
        const target = event.target.closest(selector);

        if (target && parent.contains(target)) {
            // Call handler with target element as 'this'
            handler.call(target, event);
        }
    };

    parent.addEventListener(eventType, listener);

    // Return cleanup function
    return () => {
        parent.removeEventListener(eventType, listener);
    };
}

/**
 * Add event listener with automatic cleanup
 * 
 * @param {HTMLElement} element - Target element
 * @param {string} eventType - Event type
 * @param {Function} handler - Event handler
 * @param {Object} options - addEventListener options
 * @returns {Function} Cleanup function
 */
function on(element, eventType, handler, options = {}) {
    element.addEventListener(eventType, handler, options);
    return () => element.removeEventListener(eventType, handler, options);
}

// ============================================================================
// 3. CLASS MANAGEMENT
// ============================================================================

/**
 * Utility object for class management
 * Modern alternative to jQuery's addClass/removeClass
 */
const classUtils = {
    /**
     * Add one or more classes
     */
    add(element, ...classes) {
        element.classList.add(...classes);
        return element;
    },

    /**
     * Remove one or more classes
     */
    remove(element, ...classes) {
        element.classList.remove(...classes);
        return element;
    },

    /**
     * Toggle a class
     */
    toggle(element, className, force) {
        element.classList.toggle(className, force);
        return element;
    },

    /**
     * Check if element has class
     */
    has(element, className) {
        return element.classList.contains(className);
    },

    /**
     * Replace old class with new class
     */
    replace(element, oldClass, newClass) {
        element.classList.replace(oldClass, newClass);
        return element;
    },
};

// ============================================================================
// 4. DATA ATTRIBUTES & STATE MANAGEMENT
// ============================================================================

/**
 * Get/Set data attributes
 * 
 * @param {HTMLElement} element - Target element
 * @param {string} key - Data attribute key
 * @param {*} value - Value to set (optional)
 * @returns {*} Data value or element (for chaining)
 */
function data(element, key, value) {
    if (value === undefined) {
        // Getter
        return element.dataset[key];
    }
    // Setter
    element.dataset[key] = value;
    return element;
}

/**
 * Get all data attributes as object
 */
function getAllData(element) {
    return { ...element.dataset };
}

// ============================================================================
// 5. DOM INSERTION & MANIPULATION
// ============================================================================

/**
 * Insert element at specific position
 */
const insert = {
    before(element, newElement) {
        element.parentNode.insertBefore(newElement, element);
    },

    after(element, newElement) {
        element.parentNode.insertBefore(newElement, element.nextSibling);
    },

    prepend(parent, newElement) {
        parent.insertBefore(newElement, parent.firstChild);
    },

    append(parent, newElement) {
        parent.appendChild(newElement);
    },
};

/**
 * Remove element from DOM
 */
function remove(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

/**
 * Empty element (remove all children)
 */
function empty(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// ============================================================================
// 6. ATTRIBUTE HELPERS
// ============================================================================

/**
 * Set multiple attributes at once
 */
function setAttributes(element, attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    return element;
}

/**
 * Get multiple attributes as object
 */
function getAttributes(element, ...keys) {
    const result = {};
    keys.forEach((key) => {
        result[key] = element.getAttribute(key);
    });
    return result;
}

// ============================================================================
// 7. VISIBILITY & DISPLAY
// ============================================================================

/**
 * Show/hide elements
 */
function show(element, displayType = 'block') {
    element.style.display = displayType;
}

function hide(element) {
    element.style.display = 'none';
}

function toggle(element, displayType = 'block') {
    if (element.style.display === 'none') {
        show(element, displayType);
    } else {
        hide(element);
    }
}

// ============================================================================
// DEMO & TESTING
// ============================================================================

function runDomUtilsDemo() {
    console.log('=== DOM UTILITIES DEMONSTRATION ===\n');

    // Create a sample element
    const card = createElement(
        'div',
        {
            class: 'task-card',
            dataset: { id: '1', status: 'active' },
        },
        [
            createElement('h3', {}, 'Sample Task'),
            createElement('p', {}, 'This is a description'),
            createElement('button', { class: 'btn-complete' }, 'Complete'),
        ]
    );

    console.log('1. Created element:', card);
    console.log('2. Data attributes:', getAllData(card));
    console.log('3. Has class "task-card":', classUtils.has(card, 'task-card'));

    // Note: Full DOM manipulation would require browser environment
    console.log('\n=== DEMONSTRATION COMPLETE ===');
    console.log('(Full interactive demo available in app.js)');
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createElement,
        $,
        $$,
        delegate,
        on,
        classUtils,
        data,
        getAllData,
        insert,
        remove,
        empty,
        setAttributes,
        getAttributes,
        show,
        hide,
        toggle,
        runDomUtilsDemo,
    };
}
