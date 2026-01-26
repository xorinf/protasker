import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce';

/**
 * SearchBox Component
 * 
 * Demonstrates:
 * - Controlled input
 * - useDebounce custom hook
 * - useEffect for side effects
 * - Callback to parent
 */
function SearchBox({ onSearch }) {
    const [searchValue, setSearchValue] = useState('');
    const debouncedSearchValue = useDebounce(searchValue, 300);

    // Effect runs when debounced value changes
    React.useEffect(() => {
        onSearch(debouncedSearchValue);
    }, [debouncedSearchValue, onSearch]);

    return (
        <div className="search-box">
            <input
                type="text"
                id="search-input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search tasks... (debounced 300ms)"
                autoComplete="off"
            />
        </div>
    );
}

export default SearchBox;
