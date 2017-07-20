import React, { Component } from 'react';
import './App.css';
import Card from './Card.js';
import SearchBar from "./SearchBar.js"
import Select from "./Select.js"
import star from './images/star.svg';
import wars from './images/wars.svg';
import {getData, putData} from './Action';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      peopleList: [],
      peopleHomeWords:[],
      planets: [],
      searchKeyword: '',
      page: 1,
      limit: 10,
      name: '',
      birth:'',
      editableId: 0,
      selectedName: '',
      selectedBirth: '',
      selectedHomeworld: ''
    };
    
  }
  
  componentDidMount(){
    let _self = this;
    
    _self.getPeopleList(_self.state.page, _self.state.limit);
    
    getData('planets', {}).then(function(response){
          if (response && response.length > 0) {
            let planets = [];
            for (let i = 0 ; i < response.length; i++) {
                  let object = response[i];
                  planets[object.id] = object;
                  
            }
            setTimeout(function(){
              _self.setState({planets: planets});
            }, 500);
          }
    });
  }
  
  getPeopleList(page, limit, value){
    let _self = this;
    
    this.setState({page: page});
    this.setState({limit: limit});    
    value = value || '';
    this.setState({value: value});
    
    getData('people', {_page: page, _limit: limit, q: value}).then(function(response){
          if (response) {
            _self.setState({peopleList: response});
          }
    });
  }

  nextPage(){
    let page = this.state.page + 1;
    let limit = this.state.limit + 1;
    this.getPeopleList(page, limit);
  }

  prePage(){
    if (this.state.page > 0) {          
      let page = this.state.page -1;
      let limit = this.state.limit -1;
      this.getPeopleList(page, limit);
    }
  }
  
  searchPeople(value){
      let page = this.state.page;
      let limit = this.state.limit;
      this.getPeopleList(page, limit, value);
  }
  
  editPeople(element){
    this.setState({selectedName: element.name});
    this.setState({selectedBirth: element.birth_year});
    this.setState({editableId: element.id});
  }
  
  updateUser(element){
    let _self = this;
    element['name'] = _self.state.selectedName;
    element['birth_year'] = _self.state.selectedBirth;
    element['homeworld'] = _self.state.selectedHomeworld;
     putData('people/'+element.id, element).then(function(response){
          if (response) {
            _self.setState({editableId: ''});
            _self.setState({selectedName: ''});
            _self.setState({selectedBirth: ''});
            _self.setState({selectedHomeworld: ''});
            _self.getPeopleList(_self.state.page, _self.state.limit, _self.state.searchKeyword);
          }
    });
  }

  render() {
    let _self = this;
    console.log(_self.state.planets);
    return (
      <div className='content'>
        <div className='logo'>
          <img src={star} alt="star-logo" />
          <span className='project-text'>The Project</span>
          <img src={wars} alt="wars-logo" />
        </div>
        <div>
          <button onClick={() => { _self.prePage() }}>Pre</button>
          <button onClick={() => { _self.nextPage() }}>Next</button>
        </div>
        
        <SearchBar
          onChange={(e) => {
              _self.searchPeople(e.target.value);
          }}
        />
        {
          _self.state.peopleList.map(function(element){
              
              return (
                      <div key={element.id}>
                          <div>                           
                            {_self.state.editableId === element.id ?
                                <div>
                                      <input
                                      placeholder="name"
                                      value={_self.state.selectedName}
                                      onChange={(e)=>{
                                            _self.setState({selectedName: e.target.value})
                                        }}/>
                                      <input
                                      placeholder="birth"
                                      value={_self.state.selectedBirth}
                                      onChange={(e)=>{
                                            _self.setState({selectedBirth: e.target.value})
                                        }} />
                                      
                                      <Select
                                        planets={_self.state.planets}
                                        onChange={(e)=>{
                                            _self.setState({selectedHomeworld: e.target.value})
                                        }}
                                      />
                                      
                                      <button onClick={() => { _self.updateUser(element) }}>Save</button>
                                </div>
                                :
                                <button onClick={() => { _self.editPeople(element) }}>Edit</button>
                            }
                          </div>
                          <Card
                              birth_year={element.birth_year}
                              image={element.image}
                              name={element.name}
                              home_word={
                                _self.state.planets &&
                                _self.state.planets[element.homeworld] &&
                                _self.state.planets[element.homeworld].name ? _self.state.planets[element.homeworld].name : ''}
                          />
                          
                      </div>
              )
          })
        }
        
      </div>
    );
  }
}

export default App;
