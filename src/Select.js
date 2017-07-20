import React, { Component } from 'react';
import './SearchBar.css';

class Select extends Component {
  

  
  render() {
    let _self = this;
    return (
      <div className='search-bar'>
        <select onChange={this.props.onChange}>
          {_self.props.planets ?
            _self.props.planets.map(function(element){
              return <option key={element.id} value={element.id}>{element.name}</option>
            })
          :
          null}
            
        </select>
      </div>
    );
  }
}

export default Select;
