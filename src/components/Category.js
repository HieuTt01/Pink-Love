import React, {useState} from 'react';
import PropTypes from 'prop-types';
import "./Category.css"
// import { FileAddOutlined } from '@ant-design/icons';
// import { Button } from 'antd';

Category.propTypes = {
    category: PropTypes.array,
    isActiveted: PropTypes.string,
    // onDeleteClick: PropTypes.func,
    onNoteClick: PropTypes.func,
    displayNoteByCate: PropTypes.func,

};
Category.defaultProps = {
    category: [],
    isActiveted: null,
    onDeleteClick: null,
    onNoteClick: null,
    displayNoteByCate: null,
}
 function Category(props) {
    
    const { onNoteClick, category, displayNoteByCate,isActiveted, setIsActiveted } = props;

    // function handleDelete(note) {
    //     if (onDeleClick) {
    //       onDeleClick(note)
    //     }
    //   }
    function handleClickNote(cate) {
        if (onNoteClick) {
            if (cate.id !== isActiveted) {
                onNoteClick(cate.title)
                setIsActiveted(cate.id);
                displayNoteByCate(cate.id)
            }
            else {
                setIsActiveted(null)
                onNoteClick('All notes')
                displayNoteByCate(null)
            }
         
        }
        
        
    }
    
    // const showModal = () => {
    //     openModal();
    // };
    
    return (
        <div className="category">
            <div className="title-sidebar">
                <h2 className="title-cate"> Category</h2>
                {/* <Button className="title-button"  icon={<FileAddOutlined />} onClick={showModal}>
                </Button> */}
            </div>
            <ul className="category-items">
            {

                category.map(cate => (
                    <li className={ (isActiveted === cate.id)? 'item--active': ''} key={cate.id} onClick={()=> handleClickNote(cate)}>
                        {cate.title}
                     </li>
                ))
            }
            </ul>
        </div>
    );
}
export default Category;