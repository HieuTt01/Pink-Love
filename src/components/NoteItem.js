import React from 'react';
import { Button, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

function NoteItem(props) {
    const { note, deleteNote, onEditNoteClick} = props


    function handleDeleteNote(noteId) {
      if(noteId) {
        deleteNote(noteId);
      }
      else {
        message.error("Note does not exist!")
      }
    }

    function handleEditNote(noteId) {
      if(noteId) {
        onEditNoteClick(noteId)
      }
      else {
        message.error("Note does not exist!")
      }
    }

    return (
        <div>
            <link
            rel="stylesheet"
            href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
            crossOrigin="anonymous"
          />
          <div className= "card">
            <div className="card__inner">
              <h5>{note.date}</h5>
              <h3>{note.title}</h3>
              <p>
                {note.content}
              </p>
             
            </div>
            <div className="card__inner--icon">
                <Button onClick={()=> handleEditNote(note.id)} className="button--icon" type="text" style={{ margin: "0 5px 0 0"}} icon={<EditOutlined />} >
                </Button> 
                <Button onClick={()=> handleDeleteNote(note.id)} className="button--icon" type="text" icon={<DeleteOutlined />} >
                </Button>
              </div>
          </div>
          
        </div>
    );
}

export default NoteItem;