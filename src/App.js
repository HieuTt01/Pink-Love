import React, { useState, useEffect } from 'react';
import Category from './components/Category';
import Search from './components/Search';
// import AddCategory from './components/AddCategory';
import './App.css';
import ListNotes from './components/ListNotes';
import { data } from './data/data';
import Fuse from 'fuse.js';
import 'antd/dist/antd.css';
import { message, Row } from "antd";
import AddNote from './components/AddNote'


//config
const url = "https://notebook-db.herokuapp.com/listNotes/"

function App() {

  const [listNotes, setListNotes] = useState([]);
  const [note, setNote] = useState({})
  const [cateSelected, setCateSelected] = useState("All notes");
  const [category, setCategory] = useState([])
  const [isOpenAddCate, setIsOpenAddCate] = useState(false);
  const [isOpenAddNote, setIsOpenAddNote] = useState(false);
  const [intinialData, setIntinialData] = useState();
  const [allSearchResults, setAllSearchResults] = useState([])

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
    fetchData()
  }, [])

  function fetchData () {
  fetch(url)
    .then(response=> response.json())
    .then(data => {
      setIntinialData(data);
      setListNotes(data);
      setCategory(getCategory(data));
      setAllSearchResults(data)
    })
   
  }

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
      setAllSearchResults(results)
    }
    else {
      const results = [...intinialData]
      setListNotes(results)
    }
  }

  function displayNoteByCate(cateId) {
    var newlistNotes = [];
    if (cateId !== null) {
      let temp = allSearchResults.filter((item) => {
        return item.category.id === cateId
      })
      newlistNotes = [...temp]
    }
    else {
      newlistNotes = [...allSearchResults]
    }
    setListNotes(newlistNotes);
  }

  // function onDeleClick
  // (note) {
  //   const index = listNotes.findIndex(x => x.id === note.id);
  //   if (index < 0) return;
  //   const newListNotes = [...listNotes];
  //   newListNotes.splice(index, 1);
  //   setListNotes(newListNotes);
  // }



  function onNoteClick(cateTitle) {
    // console.log(cateTitle)
    if (cateTitle) {
      setCateSelected(cateTitle)
    }
  }


  // function openAddCate() {
  //   setIsOpenAddCate(true)
  // }

  // function closeAddCate() {
  //   setIsOpenAddCate(false)
  // }

  function openAddNote() {
    setIsOpenAddNote(true)
  }

  function closeAddNote() {
    setIsOpenAddNote(false)
    setNote({})
  }

  // function onEditClick (newNotes, noteNew) {
  //   setNotes(newNotes);
  //   if(noteNew.id === noteDetail.id){
  //     setNoteDetail(noteNew);
  //   }
  // }
  // console.log(listNotes)

  function deleteNote(noteId) {
    const requestUrl = url
    fetch(requestUrl + noteId, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(response => {
      console.log('Success:', JSON.stringify(response))
      message.success("Note has been deleted!")
      fetchData()
  })
    .catch(error => {
      console.error('Error:', error)
      message.error(error)
  })
  }

  function addCategory(newCate) {
    let categories = [...category]
    categories.push(newCate)
    setCategory(categories)
  }
  function addNote(newNote) {
    const requestUrl = url
    fetch(requestUrl, {
      method: 'POST',
      body: JSON.stringify(newNote),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response))
        message.success("Note added successfully")
        fetchData()
    })
      .catch(error => {
        console.error('Error:', error)
        message.error(error)
    })
  }

  function getNoteById (noteId) {
    const requestUrl = url
    fetch(requestUrl + noteId, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(response => {
        // console.log('Success:', JSON.stringify(response))
        setNote(response)
    })
      .catch(error => {
        console.error('Error:', error)
        message.error(error)
    })
  }

  function onEditNoteClick(noteId) {
    getNoteById(noteId)
    setIsOpenAddNote(true)
  }

  function editNote(note) {
    const requestUrl = url
    fetch(requestUrl + note.id, {
      method: 'PUT',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response))
        message.success("Note updated successfully")
        fetchData()
        setNote({})
    })
      .catch(error => {
        console.error('Error:', error)
        message.error(error)
    })
  }

  return (
    <div className="App">
      <div className="App-header">
        <h3 className="header__title">Pink Love</h3>
      </div>
      <div className="App-content">
        <div className="sidebar">
          {/* <AddCategory
            isModalVisible={isOpenAddCate}
            closeModal={closeAddCate}
            addCategory={addCategory}
            nextId={category.length + 1}
            // editNote={editNote}
          /> */}
          <Category
            // onDeleClick={onDeleClick}
            onNoteClick={onNoteClick}
            category={category}
            displayNoteByCate={displayNoteByCate}
            // openModal={openAddCate}
            addCategory={addCategory}
          />
        </div>
        <div className="content">
          <Row >
            <div className="title-content">
              <h2 className="title-menu">{cateSelected ? cateSelected : 'All notes'}</h2>
            <AddNote
                isOpenAddNote={isOpenAddNote}
                closeAddNote={closeAddNote}
                openAddNote={openAddNote}
                category={category}
                // openAddCate={openAddCate}
                addNote={addNote}
                note={note}
                editNote={editNote}
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
            onEditNoteClick={onEditNoteClick}
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
