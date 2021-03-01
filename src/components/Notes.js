import React from 'react'
import Note from './Note'

const Notes = ({ notes, onDelete, onEdit }) => {

    return (
        <div className="notes">
            {notes && notes.map((note) => (
                <Note key={note.id} note={note} onDelete={onDelete} onEdit={onEdit}/>
            ))}
        </div>
    )
}

export default Notes
