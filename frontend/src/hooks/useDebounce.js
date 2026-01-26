import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing values
 * 
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} - Debounced value
 * 
 * Example:
 *   const [searchTerm, setSearchTerm] = useState('');
 *   const debouncedSearchTerm = useDebounce(searchTerm, 300);
 *   
 *   useEffect(() => {
 *     // This runs only after 300ms of no changes to searchTerm
 *     performSearch(debouncedSearchTerm);
 *   }, [debouncedSearchTerm]);
 */
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set timeout to update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function - clear timeout if value changes before delay
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Re-run effect when value or delay changes

    return debouncedValue;
}

export default useDebounce;
