import React from 'react';
import PropTypes from 'prop-types';
import "./ListNotes.css"

ListNotes.propTypes = {
    listNotes: PropTypes.array,
    onDeleteClick: PropTypes.func,
};
ListNotes.defaultProps = {
    listNotes: [],
    onDeleteClick: null,
}
function ListNotes(props) {
    const { listNotes, onDeleClick } = props 

    function handleDelete(note) {
        if (onDeleClick) {
          onDeleClick(note)
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
                    <li key={note.id}>
                        {note.title}
                     </li>
                ))
            }
            </ul>
        </div>
    );
}

export default ListNotes;