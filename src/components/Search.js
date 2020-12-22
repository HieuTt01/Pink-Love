import React from 'react';
import PropTypes from 'prop-types';
import './Search.css';

// search.propTypes = {
    
// };

function Search(props) {
    return (
        <div className="search">
             <input class="search__input"  id="lname" name="search" placeholder="Input to search..."></input>
             <button class="search__button">Search</button>
        </div>
    );
}

export default Search;