import React, { useState } from 'react';

const AddNoteDialog = ({ onClose, onAdd }) => {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        onAdd(name, category, description);
    }  

    return (
        <dialog className="dialog" open>
            <label className="dialog-label">Add Note</label>
            
            <form className="dialog-form" onSubmit={onSubmit}>
            <div>
                <input className="title-input" type="text" onChange={(e) => setName(e.target.value)} placeholder="Add note" required />

                <select className="category-input" onChange={(e) => setCategory(e.target.value)} placeholder="Add category" required >
                    <option value='home'>Home</option>
                    <option value='work'>Work</option>
                    <option value='personal'>Personal</option>
                </select>

                
                <textarea className="description-input" onChange={(e) => setDescription(e.target.value)} placeholder="Add description" />
            </div>
            <div>   
                <button className="cancel-btn" onClick={onClose}>Cancel</button>
                <button className="submit-btn" type="submit">Add</button>
            </div>
            </form>
        </dialog>
    )
}

export default AddNoteDialog
