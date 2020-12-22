import React from 'react';
import PropTypes from 'prop-types';

NoteContent.propTypes = {
  note: PropTypes.object,
  category: PropTypes.array,
};

NoteContent.defaultProps = {
    note: {},
    category: [],
}



function NoteContent(props) {
    const { note, category } = props
    if(note !=='') {
        return (
            <div>
                <h2>{note.title} </h2>
                <p>Category: {category.find(item=> item.id === note.cateId).title} - Date: {note.date}</p>
                <span>{note.content}</span>
            </div>
        );
    }else {
        return '';
    }
    
}

export default NoteContent;