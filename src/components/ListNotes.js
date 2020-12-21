import React from 'react';
import PropTypes from 'prop-types';

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
        <div className="list-notes">
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