import React from 'react';
import PropTypes from 'prop-types';
import './Search.css';

Search.propTypes = {
    changeKeySearch: PropTypes.func,
  };
  
  Search.defaultProps = {
      changeKeySearch: null,
  }

function Search(props) {

    const { changeKeySearch } = props
    function handeleChangeSearch(event) {
        if (changeKeySearch) {
            changeKeySearch(event.target.value)
        }
    }

    
    return (
        <div className="search">
             <input className="search__input"  name="search"  placeholder="Input to search..." onChange={(event)=>handeleChangeSearch(event)}>

             </input>
        </div>
    );
}

export default Search;