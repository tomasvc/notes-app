import React, { useState } from 'react'

const SearchNotes = ({ onSearch }) => {

    const [input, setInput] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
        onSearch(input);
    }

    return (
        <input className="search-bar" placeholder="Search notes" onChange={handleChange} />
    )
}

export default SearchNotes
