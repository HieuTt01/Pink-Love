import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import { Col, Row } from "antd";
import './ListNotes.css'

NoteContent.propTypes = {
    note: PropTypes.object,
    category: PropTypes.array,
    listNotes: PropTypes.array,
};

NoteContent.defaultProps = {
    note: {},
    category: [],
    listNotes: [],
}



function NoteContent(props) {
    const { note, category, listNotes } = props
    
    return (
        <>
            <Row className="notes-container" justify="center">
                {listNotes.map((note) => {
                    return (
                        <Col xl={6} md={8} sm={12} xs={24} className="product-col">
                            <NoteItem note={note.item} />
                        </Col>

                    )
                })}
            </Row>
        </>
    )


}

export default NoteContent;