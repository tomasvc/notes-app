import React, { useState } from 'react';
import './AddNoteModal.css';

import { Modal, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';

const AddNoteModal = ({ onAdd, open, close }) => {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        onAdd(name, category, description);
    }  

    return (

        <Modal open={open} onClose={close} >
            <div className="modal">
                <h3 className="modal__label">Add note</h3>
                <div className="modal__content">
                    <input className="content__titleInput" variant="outlined" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
                    <FormControl className="content__categoryInput" variant="outlined">
                        <InputLabel>Category</InputLabel>
                        <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <MenuItem value="home">Home</MenuItem>
                            <MenuItem value="work">Work</MenuItem>
                            <MenuItem value="personal">Personal</MenuItem>
                        </Select>
                    </FormControl>
                    <textarea className="content__descriptionInput" variant="outlined" placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="modal__buttons">
                    <Button autoFocus color="primary" onClick={close}>Cancel</Button>
                    <Button autoFocus color="primary" onClick={onSubmit}>Add</Button>
                </div>
            </div>
        </Modal>
        
    )

}

export default AddNoteModal
