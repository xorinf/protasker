/**
 * PERFORMANCE UTILITIES — Optimization Patterns
 * 
 * Essential performance optimization utilities:
 * 1. Debounce - Delay execution until after events stop
 * 2. Throttle - Limit execution frequency
 * 3. Memoization - Cache expensive function results
 * 4. Request Animation Frame - Optimize visual updates
 * 
 * These patterns are critical for building performant web applications.
 */

// ============================================================================
// 1. DEBOUNCE — Delay Until Events Stop
// ============================================================================

/**
 * Debounce function execution
 * 
 * Use case: Wait until user stops typing before executing search
 * 
 * How it works:
 * - Delays function execution
 * - Resets timer on each call
 * - Only executes after wait period of inactivity
 * 
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @param {boolean} immediate - Execute on leading edge instead of trailing
 * @returns {Function} Debounced function
 * 
 * Example:
 *   const searchAPI = debounce((query) => {
 *     fetch(`/api/search?q=${query}`)
 *   }, 300);
 * 
 *   // User types: "h" "e" "l" "l" "o"
 *   // API only called once, 300ms after typing stops
 */
function debounce(func, wait, immediate = false) {
    let timeout;

    return function debounced(...args) {
        const context = this;

        const later = () => {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) {
            func.apply(context, args);
        }
    };
}

// ============================================================================
// 2. THROTTLE — Limit Execution Frequency
// ============================================================================

/**
 * Throttle function execution
 * 
 * Use case: Limit scroll event handlers to execute at most once per 100ms
 * 
 * How it works:
 * - Executes function at most once per time period
 * - Guarantees regular execution during sustained events
 * - Prevents function from running too frequently
 * 
 * @param {Function} func - Function to throttle
 * @param {number} limit - Minimum time between executions (ms)
 * @returns {Function} Throttled function
 * 
 * Example:
 *   const trackScroll = throttle(() => {
 *     console.log('Scroll position:', window.scrollY);
 *   }, 100);
 * 
 *   window.addEventListener('scroll', trackScroll);
 *   // Executes at most once every 100ms during scrolling
 */
function throttle(func, limit) {
    let inThrottle;
    let lastResult;

    return function throttled(...args) {
        const context = this;

        if (!inThrottle) {
            lastResult = func.apply(context, args);
            inThrottle = true;

            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }

        return lastResult;
    };
}

// ============================================================================
// 3. MEMOIZATION — Cache Function Results
// ============================================================================

/**
 * Memoize expensive function calls
 * 
 * Use case: Cache results of expensive calculations (Fibonacci, API calls, etc.)
 * 
 * How it works:
 * - Creates a cache for function results
 * - Returns cached result if arguments match
 * - Only recomputes when arguments change
 * 
 * @param {Function} func - Function to memoize
 * @returns {Function} Memoized function
 * 
 * Example:
 *   const fibonacci = memoize((n) => {
 *     if (n <= 1) return n;
 *     return fibonacci(n - 1) + fibonacci(n - 2);
 *   });
 * 
 *   fibonacci(40); // Takes time on first call
 *   fibonacci(40); // Instant on subsequent calls
 */
function memoize(func) {
    const cache = new Map();

    return function memoized(...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = func.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

/**
 * Memoize with custom key generator
 * Useful when default JSON.stringify isn't appropriate
 */
function memoizeWith(func, keyGenerator) {
    const cache = new Map();

    return function memoized(...args) {
        const key = keyGenerator(...args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = func.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// ============================================================================
// 4. REQUEST ANIMATION FRAME — Optimize Visual Updates
// ============================================================================

/**
 * Throttle function to run at most once per animation frame
 * 
 * Use case: Optimize scroll handlers that update visual elements
 * 
 * Benefits:
 * - Syncs with browser's repaint cycle (60fps = ~16ms)
 * - Prevents layout thrashing
 * - Smoother animations
 * 
 * @param {Function} func - Function to optimize
 * @returns {Function} RAF-optimized function
 */
function rafThrottle(func) {
    let rafId = null;

    return function optimized(...args) {
        const context = this;

        if (rafId === null) {
            rafId = requestAnimationFrame(() => {
                func.apply(context, args);
                rafId = null;
            });
        }
    };
}

/**
 * Debounce using requestAnimationFrame
 * Executes on next frame after events stop
 */
function rafDebounce(func) {
    let rafId = null;

    return function optimized(...args) {
        const context = this;

        if (rafId !== null) {
            cancelAnimationFrame(rafId);
        }

        rafId = requestAnimationFrame(() => {
            func.apply(context, args);
            rafId = null;
        });
    };
}

// ============================================================================
// 5. BATCH UPDATES — Combine Multiple Operations
// ============================================================================

/**
 * Batch multiple function calls into a single execution
 * 
 * Use case: Combine multiple state updates into one render
 */
function createBatcher(func, wait = 0) {
    let queue = [];
    let timeout = null;

    return function batch(item) {
        queue.push(item);

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const items = queue;
            queue = [];
            func(items);
        }, wait);
    };
}

// ============================================================================
// 6. ONCE — Execute Function Only Once
// ============================================================================

/**
 * Ensure a function can only be called once
 * 
 * Use case: Initialization functions, one-time setup
 * 
 * @param {Function} func - Function to wrap
 * @returns {Function} Once-callable function
 */
function once(func) {
    let called = false;
    let result;

    return function onceWrapper(...args) {
        if (!called) {
            called = true;
            result = func.apply(this, args);
        }
        return result;
    };
}

// ============================================================================
// 7. RETRY WITH BACKOFF — Handle Failures Gracefully
// ============================================================================

/**
 * Retry a function with exponential backoff
 * 
 * Use case: Retry failed API calls with increasing delays
 * 
 * @param {Function} func - Async function to retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} baseDelay - Base delay in ms
 * @returns {Promise} Result of successful call
 */
async function retryWithBackoff(func, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await func();
        } catch (error) {
            if (attempt === maxRetries) {
                throw error;
            }

            const delay = baseDelay * Math.pow(2, attempt);
            console.log(`Retry attempt ${attempt + 1} after ${delay}ms`);

            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
}

// ============================================================================
// DEMO & PERFORMANCE COMPARISON
// ============================================================================

function runPerformanceDemo() {
    console.log('=== PERFORMANCE UTILITIES DEMONSTRATION ===\n');

    // 1. Debounce Demo
    console.log('1. DEBOUNCE:');
    let debounceCount = 0;
    const debouncedFunc = debounce(() => {
        debounceCount++;
        console.log('Debounced function executed:', debounceCount);
    }, 300);

    // Simulate rapid calls
    console.log('Calling 5 times rapidly...');
    for (let i = 0; i < 5; i++) {
        debouncedFunc();
    }
    console.log('(Will execute once after 300ms delay)\n');

    // 2. Throttle Demo
    console.log('2. THROTTLE:');
    let throttleCount = 0;
    const throttledFunc = throttle(() => {
        throttleCount++;
        console.log('Throttled function executed:', throttleCount);
    }, 100);

    console.log('Calling 10 times with delays...');
    // Note: Can't actually demonstrate timing in sync code
    console.log('(Would execute at most once per 100ms)\n');

    // 3. Memoization Demo
    console.log('3. MEMOIZATION:');

    // Expensive Fibonacci (without memoization)
    const slowFib = (n) => {
        if (n <= 1) return n;
        return slowFib(n - 1) + slowFib(n - 2);
    };

    // Memoized Fibonacci
    const fastFib = memoize((n) => {
        if (n <= 1) return n;
        return fastFib(n - 1) + fastFib(n - 2);
    });

    console.time('Without memoization (n=35)');
    const result1 = slowFib(35);
    console.timeEnd('Without memoization (n=35)');

    console.time('With memoization (n=35)');
    const result2 = fastFib(35);
    console.timeEnd('With memoization (n=35)');

    console.time('Memoized second call (n=35)');
    const result3 = fastFib(35);
    console.timeEnd('Memoized second call (n=35)');

    console.log('Results:', { result1, result2, result3 });
    console.log('');

    // 4. Once Demo
    console.log('4. ONCE:');
    let initCount = 0;
    const initialize = once(() => {
        initCount++;
        console.log('Initialization running...');
        return 'Initialized';
    });

    console.log('First call:', initialize());
    console.log('Second call:', initialize());
    console.log('Third call:', initialize());
    console.log('Init count:', initCount, '(should be 1)');
    console.log('');

    console.log('=== DEMONSTRATIONS COMPLETE ===');
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
    debounce,
    throttle,
    memoize,
    memoizeWith,
    rafThrottle,
    rafDebounce,
    createBatcher,
    once,
    retryWithBackoff,
    runPerformanceDemo,
};
