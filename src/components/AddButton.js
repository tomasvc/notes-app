import React from 'react'

const AddButton = ({ handleClick }) => {
    return (
        <button className="add-btn" onClick={handleClick}>Add Note</button>
    )
}

export default AddButton
