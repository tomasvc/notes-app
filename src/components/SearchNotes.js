import React, { useState } from 'react'

const SearchNotes = () => {

    const [input, setInput] = useState('');

    return (
        <input className="search-bar" placeholder="Search notes" onChange={(e) => setInput(e.target.value)} />
    )
}

export default SearchNotes
