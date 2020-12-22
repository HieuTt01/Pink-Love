import React from 'react';
import PropTypes from 'prop-types';

NoteContent.propTypes = {
  note: PropTypes.object 
};

NoteContent.defaultProps = {
    note: {},
}

function NoteContent(props) {
    const { note } = props
    return (
            <div>
                <h2>{note.title} </h2>
                <p>Category: {note.cateId} - Date: {note.date}</p>
                <span>{note.content}</span>
            </div>
    );
}

export default NoteContent;