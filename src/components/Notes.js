import React from 'react'
import Note from './Note'

const Notes = ({ notes, onComplete, onDelete }) => {

    return (
        <div className="notes">
            {notes && notes?.map(note => (
                <Note key={note.id} note={note} onComplete={onComplete} onDelete={onDelete} />
            ))}
        </div>
    )
    
}

export default Notes
