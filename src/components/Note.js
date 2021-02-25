import React from 'react'

const Note = ({ note, onEdit, onDelete }) => {
    return (
        <div className={`note ${note.category == 'home' ? 'home' : note.category == 'work' ? 'work' : 'personal'}`}>
            <div>
                <input type="checkbox"></input>
                <div className="click-me"></div>
                <h3 className="note-title">{note.name}</h3><button className="edit-btn" onClick={onEdit}/><button className="delete-btn" onClick={() => onDelete(note.id)}/>
            </div>
            <p className="note-description">{note.description}</p>
        </div>
    )
}

export default Note