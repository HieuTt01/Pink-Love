import React, { useState, useEffect } from 'react';
import ListNotes from './components/ListNotes';
import Search from './components/Search';
import AddNote from './components/AddNote';
import './App.css';
import { Layout } from 'antd';
import "antd/dist/antd.css";
import NoteContent from './components/NoteContent';

function App() {

  const [listNotes, setListNotes] = useState([
    {id: 1, title:'I love reading book!', content:'Book ...'},
    {id: 2, title:'I love reading book 111!', content:'Book ...'},
    {id: 3, title:'I love reading book 123!', content:'Book ...'}
  ]);
  const [note, setNote] = useState( listNotes[0]);

  function onDeleClick (note) {
    console.log(note);
    const index = listNotes.findIndex(x => x.id === note.id );
    if (index < 0) return;
    const newListNotes = [...listNotes];
    newListNotes.splice(index, 1);
    setListNotes(newListNotes);
  }

  function clickNote (note) {
    if (note) {
      setNote(note)
    }
  }
  
  const { Header, Footer, Sider, Content } = Layout;
  return (
  <div className="App">
    <div className="App-header">
      <h3 className="header__title">Notebook App</h3>
    </div>
    <div className="App-content">
      <div class="sidebar">
        <Search />
        {/* <AddNote /> */}
        <ListNotes listNotes={listNotes} onDeleClick={onDeleClick}/>
      </div>
      <div class="content">
        <NoteContent note={note} />
      </div>
    </div>
    <div class="App-footer">
      <h4 className="footer-item"> HieuTt01 © 2 0 2 0</h4>
    </div>
  </div>
    
  );
}

export default App;
