import React from 'react';
import {Component} from 'react';
import './dropdown.css';

// material ui imports
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// google login
import { GoogleLogin, GoogleLogout} from 'react-google-login';


class App extends Component {

  state = {
    date:'',
    size:'',
    shape:'',
    windDir:'',
    location:'',
    sizeOpen: false,
    shapeOpen: false,
    windOpen: false
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
      const sessionData = {date: this.state.date,
                          location: this.state.location,
                          size: this.state.size,
                          shape: this.state.shape,
                          windDir: this.state.windDir
                        }
      console.log(sessionData);
    }
  }

  sizeInput(){
    return(
      <FormControl size="medium" fullWidth={true}>
        <InputLabel id="demo-controlled-open-select-label">Size</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={this.state.sizeOpen}
          onClose={this.handleSizeClose}
          onOpen={this.handleSizeOpen}
          value={this.state.size}
          onChange={this.handleSizeChange}
        >
          <MenuItem value={0}>0m</MenuItem>
          <MenuItem value={0.5}>0.5m</MenuItem>
          <MenuItem value={1}>1m</MenuItem>
          <MenuItem value={2}>2m</MenuItem>
          <MenuItem value={2.5}>2.5m</MenuItem>
          <MenuItem value={3}>3m</MenuItem>
          <MenuItem value={3.4}>3.5m</MenuItem>
          <MenuItem value={4}>4m</MenuItem>

        </Select>
      </FormControl>
    );
  }

  shapeInput(){
    return(
      <FormControl size="medium" fullWidth={true}>
        <InputLabel id="demo-controlled-open-select-label">Shape</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={this.state.shapeOpen}
          onClose={this.handleShapeClose}
          onOpen={this.handleShapeOpen}
          value={this.state.shape}
          onChange={this.handleShapeChange}
        >
          <MenuItem value={"glassy"}>glassy</MenuItem>
          <MenuItem value={"clean"}>clean</MenuItem>
          <MenuItem value={"peaky"}>peaky</MenuItem>
          <MenuItem value={"long period"}>long period</MenuItem>
          <MenuItem value={"bumpy"}>bumpy</MenuItem>
          <MenuItem value={"messy"}>messy</MenuItem>
        </Select>
      </FormControl>
    );
  }

  windInput(){
    return(
      <FormControl size="medium" fullWidth={true}>
        <InputLabel id="demo-controlled-open-select-label">Wind Direction</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={this.state.windOpen}
          onClose={this.handleWindClose}
          onOpen={this.handleWindOpen}
          value={this.state.windDir}
          onChange={this.handleWindChange}
        >
          <MenuItem value={"NW"}>NW</MenuItem>
          <MenuItem value={"N"}>N</MenuItem>
          <MenuItem value={"NE"}>NE</MenuItem>
          <MenuItem value={"E"}>E</MenuItem>
          <MenuItem value={"SE"}>SE</MenuItem>
          <MenuItem value={"S"}>S</MenuItem>
          <MenuItem value={"SW"}>SW</MenuItem>
          <MenuItem value={"W"}>W</MenuItem>
        </Select>
      </FormControl>
    );
  }


  handleSizeChange = event => {
    this.setState({size:event.target.value});
  };

  handleSizeClose = () => {
    this.setState({sizeOpen :false});
  };

  handleSizeOpen = () => {
    this.setState({sizeOpen:true});
  };

  handleShapeChange = event => {
    this.setState({shape:event.target.value});
  };

  handleShapeClose = () => {
    this.setState({shapeOpen :false});
  };

  handleShapeOpen = () => {
    this.setState({shapeOpen:true});
  };

  handleWindChange = event => {
    this.setState({windDir:event.target.value});
  };

  handleWindClose = () => {
    this.setState({windOpen :false});
  };

  handleWindOpen = () => {
    this.setState({windOpen:true});
  };

  oldForm(){
    return(
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
    );
  }


  render () {


    return (
      <div className="App">
        <h1>
          Session Logger
        </h1>

          <TextField
             label="Date Time"
             type="datetime-local"
             fullWidth={true}
             defaultValue="2020-01-24T00:00"
             onChange={event => this.setState({date: event.target.value})}
             InputLabelProps={{
               shrink: true,
             }}
           />

          <TextField id="standard-basic" fullWidth={true} label="Location" onChange={event => this.setState({location: event.target.value})}/>

          {this.sizeInput()}
          {this.shapeInput()}
          {this.windInput()}

          <Button variant="contained" color="primary" onClick={this.submitData}>Save Session</Button>
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
