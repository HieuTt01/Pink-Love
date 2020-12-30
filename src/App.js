import React, { useState, useEffect } from 'react';
import Category from './components/Category';
import Search from './components/Search';
import AddCategory from './components/AddCategory';
import './App.css';
import ListNotes from './components/ListNotes';
import { data } from './data/data';
import Fuse from 'fuse.js';
import 'antd/dist/antd.css';
import { Row } from "antd";
import AddNote from './components/AddNote'



function App() {

  const [listNotes, setListNotes] = useState([]);
  const [cateSelected, setCateSelected] = useState("All notes");
  const [category,setCategory] = useState([])
  const [isOpenAddCate, setIsOpenAddCate] = useState(false);
  const [isOpenAddNote, setIsOpenAddNote] = useState(false);
  const [intinialData, setIntinialData] = useState();

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


  const fuse = new Fuse(intinialData, options);

  useEffect(() => {
    async function initialValue() {
      const requestUrl = "http://localhost:3000/listNotes"
      const response = await fetch(requestUrl)
      const data = await response.json()
      const category = getCategory(data)
      setIntinialData(data);
      setListNotes(data);
      setCategory(category);
    }
    initialValue();

  }, [])

  function getCategory(data) {
    if (data) {
      const listCate = data.map((note) => {
        return note.category;
      });
      const listTextCate = listCate.map((cate) => {
        return JSON.stringify(cate);
      });
      const uniCate = [...new Set(listTextCate)];
      const category = uniCate.map((cate) => {
        return JSON.parse(cate);
      });
      return category;
    }
  }



  function changeKeySearch(key) {

    if (key.length > 0) {
      const searchResults = fuse.search(key);
      const results = searchResults.map(note => note.item);
      setListNotes(results)
    }
    else {
      const searchResults = fuse.search(" ");
      const results = searchResults.map(note => note.item);
      setListNotes(results)
    }
  }

  function displayNoteByCate(cateId) {
    var newlistNotes = [];
    if (cateId !== 0) {
      const searchResults = fuse.search(" ");
      const results = searchResults.map(note => note.item);
      results.map((value) => {
        if (value.category.id === cateId) {
          newlistNotes.push(value);
        }
      });
      console.log(newlistNotes)
    }
    else {
      const results = fuse.search(" ");
      newlistNotes = results.map(note => note.item);
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
  console.log(listNotes)

  function deleteNote(noteId) {
    let newListNotes = [...listNotes]
    const index = listNotes.indexOf((note) => note.id === noteId)
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
