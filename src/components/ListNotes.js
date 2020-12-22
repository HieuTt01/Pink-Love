import React from 'react';
import PropTypes from 'prop-types';
import "./ListNotes.css"

ListNotes.propTypes = {
    listNotes: PropTypes.array,
    onDeleteClick: PropTypes.func,
    onNoteClick: PropTypes.func,
};
ListNotes.defaultProps = {
    listNotes: [],
    onDeleteClick: null,
    onNoteClick: null
}
 function ListNotes(props) {
    const { listNotes, onDeleClick, onNoteClick } = props 

    function handleDelete(note) {
        if (onDeleClick) {
          onDeleClick(note)
        }
      }
    function handleClickNote(note) {
        if (onNoteClick) {
          onNoteClick(note)
        }
    }

    return (
        <div className="listnotes">
            <div lassName="title">
                <h1> All Notes</h1>
                <button>Add</button>
             </div>
            <ul >
            {
                listNotes.map(note => (
                    <li key={note.id} onClick={()=> handleClickNote(note)}>
                        {note.title}
                     </li>
                ))
            }
            </ul>
        </div>
    );
}
export default ListNotes;