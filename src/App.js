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
  // const [selectedCate, setSelectedCate] = useState('');
  const [category, setCategory] = useState(data.category)

  function displayListNotes(cateId) {
    // console.log(cateId)
    var newlistNotes = [];
    if (cateId != 0) {
        data.listNotes.map((value) => {
          // console.log(value.cateId)
          // console.log(cateId)
            if (value.cateId == cateId) {
              newlistNotes.push(value);
            }               
        });
    }
    else {
        newlistNotes = data.listNotes;
    }
    setListNotes(newlistNotes);
} 

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
        <div className="sidebar">
          <Search />
          {/* <AddNote /> */}
          <ListNotes
            listNotes={listNotes}
            onDeleClick={onDeleClick}
            onNoteClick={onNoteClick}
            // selectedCate={selectedCate}
            category={category}
            displayListNotes={displayListNotes}
            // setSelectedCate={setSelectedCate}
          />
        </div>
        <div className="content">
          <NoteContent
            note={note}
            category={category}
          />
        </div>
      </div>
      <div className="App-footer">
        <h4 className="footer-item"> HieuTt01 © 2 0 2 0</h4>
      </div>
    </div>

  );
}

export default App;
