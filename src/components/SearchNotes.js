import React, { useState, useEffect } from 'react'

const SearchNotes = ({ onSearch }) => {

    const [input, setInput] = useState('');

    useEffect(() => {
        return onSearch(input);
    }, [input])

    return (
            <input className="search-bar" placeholder="Search notes" onChange={(e) => setInput(e.target.value)} />
    )
}

export default SearchNotes
