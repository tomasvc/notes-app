import React from 'react'
import Note from './Note'

const Notes = ({ notes }) => {
    return (
        <div className="notes">
            {notes.map((note) => (
                <Note key={note.id} note={note} />
            ))}
        </div>
    )
}

export default Notes
