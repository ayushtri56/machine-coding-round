import React, { useState, useEffect, useRef } from 'react';
import styles from './autoComplete.module.css';

const SUGGESTIONS = [
    'apple',
    'banana',
    'cherry',
    'date',
    'elderberry',
    'fig',
    'grape',
    'honeydew'
];

const Autocomplete = ({ suggestions = SUGGESTIONS }) => {
    const [query, setQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const autocompleteRef = useRef(null);

    const filterSuggestions = (userInput) => {
        const filtered = suggestions.filter(
            (suggestion) =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        setFilteredSuggestions(filtered);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    };

    const debouncedFilterSuggestions = useDebounce(filterSuggestions, 300);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleChange = (e) => {
        const userInput = e.target.value;
        setQuery(userInput);
        debouncedFilterSuggestions(userInput);
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setQuery(filteredSuggestions[activeSuggestionIndex]);
            setFilteredSuggestions([]);
            setShowSuggestions(false);
        } else if (e.key === 'ArrowUp') {
            if (activeSuggestionIndex === 0) return;
            setActiveSuggestionIndex(activeSuggestionIndex - 1);
        } else if (e.key === 'ArrowDown') {
            if (activeSuggestionIndex === filteredSuggestions.length - 1) return;
            setActiveSuggestionIndex(activeSuggestionIndex + 1);
        }
    };

    return (
        <div className={styles.autocomplete} ref={autocompleteRef}>
            <input
                type="text"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={query}
                className={styles.input}
            />
            {showSuggestions && (
                <SuggestionsList
                    suggestions={filteredSuggestions}
                    activeSuggestionIndex={activeSuggestionIndex}
                    onSuggestionClick={handleSuggestionClick}
                />
            )}
        </div>
    );
};

export default Autocomplete;


const useDebounce = (callback, delay) => {
    const debounceTimeout = useRef(null);

    const debouncedFunction = (...args) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    return debouncedFunction;
};

const SuggestionsList = ({ suggestions, activeSuggestionIndex, onSuggestionClick }) => {
    return (
        <ul className={styles.suggestions}>
            {suggestions.length ? (
                suggestions.map((suggestion, index) => {
                    const className = index === activeSuggestionIndex ? styles.suggestionActive : '';
                    return (
                        <li
                            className={className}
                            key={suggestion}
                            onClick={() => onSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    );
                })
            ) : (
                <div className={styles.noSuggestions}>
                    <em>No suggestions available.</em>
                </div>
            )}
        </ul>
    );
};