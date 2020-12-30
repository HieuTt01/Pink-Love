import React, { useState, useEffect } from 'react';
import Category from './components/Category';
import Search from './components/Search';
import AddCategory from './components/AddCategory';
import './App.css';
import ListNotes from './components/ListNotes';
import { data } from './data/data';
import Fuse from 'fuse.js';
import 'antd/dist/antd.css';
import { Col, Row } from "antd";
import AddNote from './components/AddNote'



function App() {

  const [listNotes, setListNotes] = useState([]);
  const [cateSelected, setCateSelected] = useState("All notes");
  const [category,setCategory] = useState([])
  const [isOpenAddCate, setIsOpenAddCate] = useState(false);
  const [isOpenAddNote, setIsOpenAddNote] = useState(false);

  const options = {
    // isCaseSensitive: false,
    includeScore: true,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.4,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: [
      'title',
    ]
  };


  const fuse = new Fuse(data.listNotes, options);



  useEffect(() => {
    async function initialValue() {
      const results = await fuse.search(" ");
      setListNotes(results);
      setCategory(data.category);
    }
    initialValue();

  }, [])



  function changeKeySearch(key) {

    if (key.length > 0) {
      const results = fuse.search(key);
      setListNotes(results)
    }
    else {
      const results = fuse.search(" ");
      setListNotes(results)
    }
  }

  function displayNoteByCate(cateId) {
    const dataNote = fuse.search(" ");
    var newlistNotes = [];
    if (cateId !== 0) {
      dataNote.map((value) => {
        if (value.item.cateId === cateId) {
          newlistNotes.push(value);
        }
      });
    }
    else {
      newlistNotes = fuse.search(" ");
    }
    setListNotes(newlistNotes);
  }

  function onDeleClick(note) {
    const index = listNotes.findIndex(x => x.id === note.id);
    if (index < 0) return;
    const newListNotes = [...listNotes];
    newListNotes.splice(index, 1);
    setListNotes(newListNotes);
  }



  function onNoteClick(cateTitle) {
    console.log(cateTitle)
    if (cateTitle) {
      setCateSelected(cateTitle)
    }
  }


  function openAddCate() {
    setIsOpenAddCate(true)
  }

  function closeAddCate() {
    setIsOpenAddCate(false)
  }

  function openAddNote() {
    setIsOpenAddNote(true)
  }

  function closeAddNote() {
    setIsOpenAddNote(false)
  }

  // function onEditClick (newNotes, noteNew) {
  //   setNotes(newNotes);
  //   if(noteNew.id === noteDetail.id){
  //     setNoteDetail(noteNew);
  //   }
  // }

  function deleteNote(noteId) {
    // console.log(newNote)
    // console.log(listNotes)
    let newListNotes = [...listNotes]
    const index = listNotes.indexOf((note) => note.id = noteId)
    newListNotes.splice(index, 1)
    setListNotes(newListNotes)
  }

  function addCategory(newCate) {
    let categories = [...category]
    categories.push(newCate)
    setCategory(categories)
  }
  function addNote(newNote) {
    // console.log(newNote)
    // console.log(listNotes)
    let newListNotes = [...listNotes]
    newListNotes.push(newNote)
    setListNotes(newListNotes)
  }


  return (
    <div className="App">
      <div className="App-header">
        <h3 className="header__title">Pink Love</h3>
      </div>
      <div className="App-content">
        <div className="sidebar">
          <AddCategory 
            isModalVisible={isOpenAddCate} 
            closeModal={closeAddCate} 
            addCategory={addCategory}
            nextId={category.length+1}
            />
          <Category
            onDeleClick={onDeleClick}
            onNoteClick={onNoteClick}
            category={category}
            displayNoteByCate={displayNoteByCate}
            openModal={openAddCate} 
            addCategory={addCategory}
          />
        </div>
        <div className="content">
          <Row >
            <div class="title-content"> 
              <h2 className="title-menu">{ cateSelected ?  cateSelected : 'All notes'}</h2> 
              <AddNote 
                isOpenAddNote={isOpenAddNote}
                closeAddNote={closeAddNote}
                openAddNote={openAddNote} 
                category={category} 
                openAddCate={openAddCate}
                nextId={listNotes.length+1}
                addNote={addNote}
                 /> 
          </div>
          </Row>
          <Row >
              <Search
                changeKeySearch={changeKeySearch}
              />
          </Row>
          <ListNotes
            listNotes={listNotes}
            deleteNote={deleteNote}
            // note={note}
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
