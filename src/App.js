import './App.css';
import React, { useState } from 'react';
import Notes from './components/Notes';
import AddButton from './components/AddButton';
import AddNoteDialog from './components/AddNoteDialog';
import SearchNotes from './components/SearchNotes';
import Filter from './components/Filter';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyD2FAWgHdsPSyDT9MHKjLhz5VQf_13hwI4",
  authDomain: "notes-441a3.firebaseapp.com",
  projectId: "notes-441a3",
  storageBucket: "notes-441a3.appspot.com",
  messagingSenderId: "399430406358",
  appId: "1:399430406358:web:6770b7463320fb57477977",
  measurementId: "G-ZGKH7BJZTX"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App({ name, category, description }) {

  const [user] = useAuthState(auth);

  const notesRef = firestore.collection('notes');
  const query = notesRef.orderBy('createdAt');

  const [notes] = useCollectionData(query);

  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  }

  const openDialog = () => {
    setOpen(true);
  }

  const addNote = (name, category, description) => {

    closeDialog();

    notesRef.add({
      name: name,
      category: category,
      description: description,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
      console.log("Document successfully written with ID: " + docRef.id)
      notesRef.doc(docRef.id).update({id: docRef.id})
    })
    .catch((error) => {
      console.log("Error writing document: ", error)
    })

  }

  const deleteNote = (id) => {

    notesRef.doc(id).delete().then(() => {
      console.log('Note deleted with ID ' + notesRef.id);
    });
  } 

  return (
      <div className="App">
        {user ? 
          <div>
            <div className="title-background">
              <h1 className="app-title">notes.</h1>
              <h3 className="welcome-message">Hello {user.displayName.substr(0, user.displayName.indexOf(" "))} 👋</h3>
            </div>
            <SearchNotes />
            <Filter />
            <AddButton handleClick={openDialog} />
            <SignOut />
            <Notes notes={notes} onDelete={deleteNote}/>
            {open && <AddNoteDialog onAdd={addNote} onClose={closeDialog} />}
          </div>
          :
          <div className="title-background">
            <h1 className="app-title">notes.</h1>
            <SignIn />
          </div>       
        }
      </div>
  );
}

export default App;
