import React from 'react';

function NoteItem(props) {
    const note = props.note
    return (
        <div>
            <link
            rel="stylesheet"
            href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
            crossOrigin="anonymous"
          />
          <div className="card">
            <div className="card__inner">
              <h5>{note.date}</h5>
              <h3>{note.title}</h3>
              <p>
                {note.content}
              </p>
            </div>
          </div>
        </div>
    );
}

export default NoteItem;