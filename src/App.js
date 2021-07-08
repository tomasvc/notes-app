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


function App() {

  const [user] = useAuthState(auth)

  const [notes, setNotes] = useState(null)

  const [noteNum, setNoteNum] = useState(0);
  const [complete, setComplete] = useState(0);

  const [filteredList, setFilteredList] = useState([])
  const [searchList, setSearchList] = useState([])

  const [showAddModal, setShowAddModal] = useState(false);


  useEffect(() => {

    if (user) {

      db.collection('notes').where('user_id', '==', user?.uid).get().then(snapshot => {
        setNotes(snapshot.docs.map(item => item.data()))
      })

    }

  }, [user])


  useEffect(() => {
    setNoteNum(notes?.length)
  }, [notes])
  

  const filter = (value) => {

    setFilteredList(notes.filter((note) => {
      return note.category === value
    }))

    if (filteredList.length === 0) {
      setFilteredList(['<h1 className="error-empty">Could not find any notes</h1>'])
    }

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
    .then( async (docRef) => {
      console.log("Document successfully written with ID: " + docRef.id)
      await db.collection('notes').doc(docRef.id).update({id: docRef.id})
    })
    .then( async () => {
      await db.collection('notes').where('user_id', '==', user?.uid).get().then(snapshot => {
        setNotes(snapshot.docs.map(item => item.data()))
      })
    })
    .catch((error) => {
      console.log("Error writing document: ", error)
    })

    setShowAddModal(false)

  }


  const completeNote = (isComplete) => {
    if (isComplete === false) {
      setComplete(complete + 1)
    } else {
      setComplete(complete - 1)
    }
  }


  const searchNotes = (input) => {
    if (input) {
      setSearchList(notes.filter((note) => {
        return note.name.includes(input)
      }))
    } else
      setSearchList([])
  }


  const deleteNote = async (id, isComplete) => {
    await db.collection('notes').doc(id).delete().then(() => {
      if (isComplete && complete > 0) {

        setComplete(complete - 1)

        db.collection('notes').where('user_id', '==', user?.uid).get().then(snapshot => {
          setNotes(snapshot.docs.map(item => item.data()))
        })
        
      } else if (!isComplete && complete > 0) {

        db.collection('notes').where('user_id', '==', user?.uid).get().then(snapshot => {
          setNotes(snapshot.docs.map(item => item.data()))
        })

      } else {

        db.collection('notes').where('user_id', '==', user?.uid).get().then(snapshot => {
          setNotes(snapshot.docs.map(item => item.data()))
        })

      }
    })
    .catch((error) => {
      console.log("Error deleting note: ", error)
    })
  } 


  const showNotesNum = (notes) => {
    return notes.length.toString()
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

          <div>

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

            <ProgressBar noteNum={noteNum} completeNum={complete} onChange={showNotesNum} value={(complete / notes?.length) * 100}/>

            {
            searchList.length !== 0 ? <Notes notes={searchList} onComplete={completeNote} onDelete={deleteNote} /> 
            : 
            filteredList.length !== 0 ? <Notes notes={filteredList} onComplete={completeNote} onDelete={deleteNote} /> 
            :
            notes !== undefined && <Notes notes={notes} onComplete={completeNote} onDelete={deleteNote} /> 
            }

          </div>

          :

          <div>
            <div className="title-background">
              <h1 className="app-title">notes.</h1>
            </div>
            <SignIn />
          </div>  

        }

      </div>

  )

}

export default App;