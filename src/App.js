import './App.css';
import React, { useState } from 'react';
import Notes from './components/Notes';
import AddButton from './components/AddButton';
import AddNoteDialog from './components/AddNoteDialog';
import SearchNotes from './components/SearchNotes';
import Filter from './components/Filter';

import firebase from 'firebase';

function App({ name, category, description }) {

  const auth = firebase.auth();

  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([
    {
      id: 0,
      name: 'Work out',
      category: 'home',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget tempus dolor.'
    },
    {
      id: 1,
      category: 'home',
      name: 'Call mom',
      description: 'Nulla porttitor auctor ultricies. Curabitur et purus efficitur, consectetur nisl a, congue mi.'
    }
  ]);

  const closeDialog = () => {
    setOpen(false);
    console.log('Dialog closed');
  }

  const openDialog = () => {
    setOpen(true);
    console.log('Dialog opened');
  }

  const addNote = (name, category, description) => {
    closeDialog();
    
    const id = Math.floor(Math.random() * 1000) + 1;
    const newNote = { id, name, category, description };
    console.log(newNote);
    setNotes([...notes, newNote]);
}

  

  return (
    <div className="App">
      <h1 className="app-title">notes</h1>
      <SearchNotes />
      <Filter />
      <AddButton handleClick={openDialog} />
      <Notes notes={notes} />
      {open && <AddNoteDialog onAdd={addNote} onClose={closeDialog} />}
    </div>
  );
}

export default App;
