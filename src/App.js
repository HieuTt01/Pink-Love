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
  <>
    <Layout>
      <Header>Notebook App</Header>
      <Layout >
        <Sider>
          <Search />
          <AddNote />
          <ListNotes listNotes={listNotes} onDeleClick={onDeleClick}/>
        </Sider>
        <Content>
          <NoteContent note={note} />
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  </>
    
  );
}

export default App;
