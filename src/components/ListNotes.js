import React from 'react';
import PropTypes from 'prop-types';
import "./ListNotes.css"

ListNotes.propTypes = {
    listNotes: PropTypes.array,
    category: PropTypes.array,
    onDeleteClick: PropTypes.func,
    onNoteClick: PropTypes.func,

};
ListNotes.defaultProps = {
    listNotes: [],
    category: [],
    onDeleteClick: null,
    onNoteClick: null
}
 function ListNotes(props) {
    const { listNotes, onDeleClick, onNoteClick, category } = props 

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

    function displayCategory() {
        // console.log(category)
        category.map(item => (
            <option key={item.id} value={item.id}>{item.title}</option>
        ))
    }

    return (
        <div className="listnotes">
            <div className="title">
                <select name="category">
                    <option value={0}>All Note</option>
                    {displayCategory()}

                </select>
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