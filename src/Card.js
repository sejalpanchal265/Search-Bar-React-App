import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {
    return (
      <div className='card'>
        <div className='card-content'>
          	<div className='card-name'>{this.props.name ? this.props.name : ''}</div>
          	<img src={this.props.image ? "http://localhost:3008/"+this.props.image : 'http://localhost:3008/darth_vader.jpg'} alt='profile'/>
            <p>
                <span>Birthday:</span>
                <span>{this.props.birth_year ? this.props.birth_year : ''}</span>
            </p>
            <p>
                {/* Note that in order to get the homeworld's name, you have to get the planet name from a different endpoint than the people */}
                <span>Homeworld:</span>
                <span>{this.props.home_word ? this.props.home_word : ''}</span>
            </p>
        </div>
    </div>

    );
  }
}

export default Card;
