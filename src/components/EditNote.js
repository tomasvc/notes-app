import React, { useState } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';

const EditNote = ({ onClose }) => {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const onEdit = (e) => {
        e.preventDefault();
        onEdit(name, category, description);
    } 

    return (
        /*<dialog className="dialog" open>
            <label className="dialog-label">Edit Note</label>
            
            <form className="dialog-form" onSubmit={onEdit}>
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
                <button className="submit-btn" type="submit">Edit</button>
            </div>
            </form>
        </dialog>*/


        <Dialog className="dialog" maxWidth="md" open>
            <DialogTitle>Edit note</DialogTitle>
            <DialogContent>
                <TextField className="title-input" variant="outlined" label="Name" onChange={(e) => setName(e.target.value)} required />
                <FormControl className="category-input" variant="outlined">
                    <InputLabel>Category</InputLabel>
                    <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <MenuItem value="home">Home</MenuItem>
                        <MenuItem value="work">Work</MenuItem>
                        <MenuItem value="personal">Personal</MenuItem>
                    </Select>
                </FormControl>
                <TextField className="description-input" variant="outlined" label="Description" onChange={(e) => setDescription(e.target.value)} required />
            </DialogContent>
            <DialogActions>
                <Button autofocus color="primary" onClick={onClose}>Cancel</Button>
                <Button autofocus color="primary" onClick={onEdit}>Add</Button>
            </DialogActions>
        </Dialog>

    )
}

export default EditNote;
