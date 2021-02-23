import React from 'react'

const Note = ({ note }) => {
    return (
        <div className={`note ${note.category == 'home' ? 'home' : note.category == 'work' ? 'work' : 'personal'}`}>
            <div>
                <input type="checkbox"></input>
                <div className="click-me"></div>
                <h3 className="note-title">{note.name}</h3><button className="edit-btn"/><button className="delete-btn"/>
            </div>
            <p className="note-description">{note.description}</p>
        </div>
    )
}

export default Note