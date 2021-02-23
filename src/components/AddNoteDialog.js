import React, { useState } from 'react';

const AddNoteDialog = ({ onClose, onAdd }) => {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        onAdd(name, category, description);
    }

    /*const onSelect = () => {
        document.querySelector('.custom-select__trigger').classList.toggle('open');

        for (const option of document.querySelectorAll(".custom-option")) {
            option.addEventListener('click', () => {
                if (!this.classList.contains('selected')) {
                    this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                    this.classList.add('selected');
                    this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
                }
            })
        }
    
        window.addEventListener('click', (e => {
            const select = document.querySelctor('custom-select');
            if (!select.contains(e.target)) {
                select.classList.remove('open')
            }
        }))


        <div className="custom-select-wrapper" onClick={onSelect}>
                    <div className="custom-select__trigger" onChange={(e) => setCategory(e.target.value)}><span>Select Category</span>
                        <div className="arrow"></div>
                    </div>
                    <div className="custom-options">
                        <span className="custom-option selected" data-value="home">Home</span>
                        <span className="custom-option" data-value="home">Home</span>
                        <span className="custom-option" data-value="home">Home</span>
                    </div>
                </div>

    }*/

    

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
