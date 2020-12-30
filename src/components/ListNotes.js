import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import { Col, Row } from "antd";
import './ListNotes.css'

ListNotes.propTypes = {
    // note: PropTypes.object,
    category: PropTypes.array,
    listNotes: PropTypes.array,
    deleteNote: PropTypes.func,
};

ListNotes.defaultProps = {
    // note: {},
    category: [],
    listNotes: [],
    deleteNote: null,
}



function ListNotes(props) {
    const { category, listNotes, deleteNote } = props
    
    return (
        <>
            <Row className="notes-container" justify="center">
                {listNotes.map((note) => {
                    return (
                        <Col xl={6} md={8} sm={12} xs={24} className="product-col">
                            <NoteItem note={note.item} deleteNote={deleteNote} />
                        </Col>

                    )
                })}
            </Row>
        </>
    )


}

export default ListNotes;