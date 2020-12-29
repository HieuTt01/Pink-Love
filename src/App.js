import React, { useState, useEffect } from 'react';
import Category from './components/Category';
import Search from './components/Search';
import AddCategory from './components/AddCategory';
import './App.css';
import NoteContent from './components/ListNotes';
import { data } from './data/data';
import Fuse from 'fuse.js';
import 'antd/dist/antd.css';
import { Col, Row } from "antd";
import AddNote from './components/AddNote'



function App() {

  const [listNotes, setListNotes] = useState([]);
  const [cateSelected, setCateSelected] = useState();
  const category = data.category;
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
      setListNotes(results)
      // setNote(listNotes[0]?.item)
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



  function onNoteClick(cate) {
    if (cate) {
      setCateSelected(cate)
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
  return (
    <div className="App">
      <div className="App-header">
        <h3 className="header__title">Pink Love</h3>
      </div>
      <div className="App-content">
        <div className="sidebar">
          <AddCategory isModalVisible={isOpenAddCate} closeModal={closeAddCate} />
          <Category
            onDeleClick={onDeleClick}
            onNoteClick={onNoteClick}
            category={category}
            displayNoteByCate={displayNoteByCate}
            openModal={openAddCate} 
          />
        </div>
        <div >
          <Row >
            <div class="title-content"> 
              <h2 className="title-menu">{cateSelected?cateSelected:'All Notes'}</h2> 
              <AddNote isModalVisible={isOpenAddNote} closeModal={closeAddNote} openModal={openAddNote} /> 
          </div>
          </Row>
          <Row >
              <Search
                changeKeySearch={changeKeySearch}
              />
          </Row>
          <NoteContent
            listNotes={listNotes}
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
