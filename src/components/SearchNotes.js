import React, { useState } from 'react'

const SearchNotes = ({ onSearch }) => {

    const [input, setInput] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
        onSearch(input);
    }

    return (
        <div>
            <input className="search-bar" placeholder="Search notes" onChange={handleChange} />
        </div>
    )
}

export default SearchNotes
