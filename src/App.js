import './App.css';
import React, { useState, useEffect } from 'react';
import Notes from './components/Notes';
import AddNoteModal from './components/AddNoteModal';
import SearchNotes from './components/SearchNotes';
import ProgressBar from './components/ProgressBar';
import Filter from './components/Filter';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import { Button } from '@material-ui/core';

import firebase from 'firebase/app';
import { db, auth } from './firebase';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function App() {

  const [user] = useAuthState(auth);

  const [notes] = useCollectionData(db.collection('notes').orderBy('createdAt'));

  const [noteNum, setNoteNum] = useState(0);
  const [complete, setComplete] = useState(0);

  const [filterList, setFilterList] = useState([])

  const [searchList, setSearchList] = useState([])

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    
    if (notes) {
      setNoteNum(notes.length)
    }

  }, [notes])


  const filter = (value) => {
    setFilterList(notes.filter((note) => {
      return note.category === value
    }))
  }
 

  const addNote = async (name, category, description) => {

    const { uid } = auth.currentUser;

    await db.collection('notes').add({
      user_id: uid,
      name,
      category,
      description,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
      console.log("Document successfully written with ID: " + docRef.id)
      db.collection('notes').doc(docRef.id).update({id: docRef.id})
      setNoteNum(noteNum + 1);
    })
    .catch((error) => {
      console.log("Error writing document: ", error)
    })

    setShowAddModal(false);

  }

  const completeNote = (isComplete) => {
    if (isComplete === false) {
      setComplete(complete + 1);
    } else {
      setComplete(complete - 1);
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

  const deleteNote = (id, isComplete) => {
    db.collection('notes').doc(id).delete().then(() => {
      if (isComplete && complete > 0) {
        setComplete(complete - 1);
      }
    })
    .catch((error) => {
      console.log("Error deleting note: ", error)
    })
  } 

  const showNotes = (notes) => {
    return notes.length.toString();
  }

  const editNote = (id, name, category, description) => {

    db.collection('notes').doc(id).update({
      name,
      category,
      description
    })

    setShowEditModal(false)

  }

  return (

      <div className="App">

        <AddNoteModal 
          onAdd={addNote} 
          open={showAddModal} 
          close={() => setShowAddModal(false)} 
        />

        { 
          user ? 

          <>

            <div className="title-background">
              <h1 className="app-title">notes.</h1>
              <h3 className="welcome-message">Hello {user.displayName.substr(0, user.displayName.indexOf(" "))} 👋</h3>
            </div>

            <SearchNotes onSearch={searchNotes}/>

            <div className="nav-container">
              <Filter onFilter={filter} />
              <div className="container-buttons">
                <Button color="primary" variant="contained" className="add-btn" onClick={() => setShowAddModal(true)}>Add Note</Button>
                <SignOut />
              </div>
            </div>

            <ProgressBar noteNum={noteNum} completeNum={complete} onChange={showNotes} value={(complete / notes?.length) * 100}/>

            {
            searchList.length !== 0 ? <Notes notes={searchList} onComplete={completeNote} onEdit={editNote} onDelete={deleteNote} open={showEditModal} /> 
            : 
            filterList.length !== 0 ? <Notes notes={filterList} onComplete={completeNote} onEdit={editNote} onDelete={deleteNote} open={showEditModal} /> 
            :
            notes !== undefined && <Notes notes={notes} onComplete={completeNote} onEdit={editNote} onDelete={deleteNote} open={showEditModal} /> 
            }

          </>

          :

          <>
            <div className="title-background">
              <h1 className="app-title">notes.</h1>
            </div>
            <SignIn />
          </>  

        }

      </div>

  )

}

export default App;