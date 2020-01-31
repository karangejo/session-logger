import React from 'react';
import {Component} from 'react';
import './dropdown.css';


class App extends Component {

  state = {
    date:'',
    size:'',
    shape:'',
    windDir:'',
    location:''
  }

  validateData = () => {
    if(!this.state.date || !this.state.size || !this.state.shape || !this.state.windDir || !this.state.location){
      return false;
    }
    return true;
  }

  submitData = (event) => {
    event.preventDefault();
    if(this.validateData()){
      console.log("saving session to database");
    }
  }

  render () {
    return (
      <div className="App">
        <h1>
          Session Logger
        </h1>
          <form action="submit" onSubmit={this.submitData}>
            <h4>date: </h4>
            <input type="text" onChange={event => this.setState({date: event.target.value})}/><br/>
            <h4>size: </h4>
            <input type="text" onChange={event => this.setState({size: event.target.value})}/><br/>
            <h4>shape: </h4>
            <input type="text" onChange={event => this.setState({shape: event.target.value})}/><br/>
            <h4>wind direction: </h4>
            <input type="text" onChange={event => this.setState({windDir: event.target.value})}/><br/>
            <h4>location </h4>
            <input type="text" onChange={event => this.setState({location: event.target.value})}/><br/>

            <button type="submit">Save Session</button>
          </form>

      </div>
    );
  }
}

export default App;


/*

might use this in the future

<div class="dropdown">
 <button class="dropbtn">size:</button>
 <div class="dropdown-content">
   <a href="/">1m</a>
   <a href="/">2m</a>
   <a href="/">3m</a>
 </div>
</div>

*/
