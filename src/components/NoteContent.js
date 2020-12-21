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
            {note.content}
        </div>
    );
}

export default NoteContent;