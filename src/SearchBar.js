import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  

  
  render() {
    return (
      <div className='search-bar'>
      <input placeholder='Search Your Destiny' onChange={this.props.onChange} />
      </div>
    );
  }
}

export default SearchBar;
