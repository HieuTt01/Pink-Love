import React, { useState, useEffect } from 'react';
import ListNotes from './components/ListNotes';
import Search from './components/Search';
import AddNote from './components/AddNote';
import './App.css';
import NoteContent from './components/NoteContent';
import { data } from './data/data'

function App() {

  const [listNotes, setListNotes] = useState(data.listNotes);
  const [note, setNote] = useState(listNotes[0]);
  const [category, setCategory] = useState(data.category)



  function onDeleClick(note) {
    console.log(note);
    const index = listNotes.findIndex(x => x.id === note.id);
    if (index < 0) return;
    const newListNotes = [...listNotes];
    newListNotes.splice(index, 1);
    setListNotes(newListNotes);
  }



  function onNoteClick(note) {
    if (note) {
      setNote(note)
    }
  }

  // function onEditClick (newNotes, noteNew) {
  //   setNotes(newNotes);
  //   if(noteNew.id === noteDetail.id){
  //     setNoteDetail(noteNew);
  //   }
  // }
  return (
    <div className="App">
      <div className="App-header">
        <h3 className="header__title">Notebook App</h3>
      </div>
      <div className="App-content">
        <div class="sidebar">
          <Search />
          {/* <AddNote /> */}
          <ListNotes
            listNotes={listNotes}
            onDeleClick={onDeleClick}
            onNoteClick={onNoteClick}
            category={category}
          />
        </div>
        <div class="content">
          <NoteContent
            note={note}
            category={category}
          />
        </div>
      </div>
      <div class="App-footer">
        <h4 className="footer-item"> HieuTt01 © 2 0 2 0</h4>
      </div>
    </div>

  );
}

export default App;
