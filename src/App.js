import './App.css';
import React, { useState } from 'react';
import Notes from './components/Notes';
import AddButton from './components/AddButton';
import AddNoteDialog from './components/AddNoteDialog';
import EditNote from './components/EditNote';
import SearchNotes from './components/SearchNotes';
import ProgressBar from './components/ProgressBar';
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

function App() {

  const [user] = useAuthState(auth);

  const notesRef = firestore.collection('notes');
  const query = notesRef.orderBy('createdAt');

  const [notes] = useCollectionData(query, {idField: 'id'});
  const [noteNum, setNoteNum] = useState(0);
  const [complete, setComplete] = useState(0);

  const [filterList, setFilterList] = useState([])

  const [searchList, setSearchList] = useState([])

  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  const filter = (value) => {
    setFilterList(notes.filter((note) => {
      return note.category === value
    }))
  }

  const closeAddDialog = () => {
    setAddDialog(false);
  }

  const openAddDialog = () => {
    setAddDialog(true);
  }

  const closeEditDialog = () => {
    setEditDialog(false);
  }

  const addNote = (name, category, description) => {

    const { uid } = auth.currentUser;

    closeAddDialog();

    notesRef.add({
      user_id: uid,
      name: name,
      category: category,
      description: description,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
      console.log("Document successfully written with ID: " + docRef.id)
      notesRef.doc(docRef.id).update({id: docRef.id})
      setNoteNum(notes.length + 1);
      console.log(noteNum);
    })
    .catch((error) => {
      console.log("Error writing document: ", error)
    })

  }

  const completeNote = (id) => {
    if (noteNum !== 0) {
      setComplete(complete + 1);
    } else {
      setComplete(0)
    }
  }

  const searchNotes = (input) => {
    if (input) {
      setSearchList(notes.filter((note) => {
        return note.name.includes(input)
      }))
    } else
      setSearchList([]);
  }

  const deleteNote = (id) => {
    notesRef.doc(id).delete().then(() => {
      console.log('Note deleted with ID ' + notesRef.id);
      setNoteNum(notes.length - 1);
    })
    .catch((error) => {
      console.log("Error deleting note", error)
    })
  } 

  const showNotes = (notes) => {
    console.log(notes.length.toString());
    return notes.length.toString();
  }

  const editNote = (id, name, category, description) => {

    setEditDialog(true);

    /*notesRef.doc(id).update({
      name: name,
      category: category,
      description: description
    })*/
  }

  return (
      <div className="App">
        {user ? 
          <div>
            <div className="title-background">
              <h1 className="app-title">notes.</h1>
              <h3 className="welcome-message">Hello {user.displayName.substr(0, user.displayName.indexOf(" "))} 👋</h3>
            </div>
            <SearchNotes onSearch={searchNotes}/>
            <Filter onFilter={filter} />
            <AddButton handleClick={openAddDialog} />
            <SignOut />
            <ProgressBar noteNum={noteNum} completeNum={complete} onChange={showNotes}/>

            {searchList.length !== 0 ? <Notes notes={searchList} onComplete={completeNote} onDelete={deleteNote} onEdit={editNote} /> 
            : 
            filterList.length !== 0 ? <Notes notes={filterList} onComplete={completeNote} onDelete={deleteNote} onEdit={editNote} /> 
            :
            notes !== undefined ? <Notes notes={notes} onComplete={completeNote} onDelete={deleteNote} onEdit={editNote} /> 
            :
            <h1 className="empty-message">You don't have any notes</h1>}

            {addDialog && <AddNoteDialog onAdd={addNote} onClose={closeAddDialog} />}
            {editDialog && <EditNote /*name={title} category={category} description={description}*/ onEdit={editNote} onClose={closeEditDialog} />}
          </div>
          :
          <>
            <div className="title-background">
              <h1 className="app-title">notes.</h1>
            </div>
            <SignIn />
          </>      
        }
      </div>
  );
}

export default App;
