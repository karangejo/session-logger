import React from 'react';
import {Component} from 'react';
import axios from 'axios';

// material ui imports
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';

// google login
import { GoogleLogin } from 'react-google-login';


class App extends Component {

  state = {
    date:'',
    size:'',
    shape:'',
    windDir:'',
    location:'',
    sizeOpen: false,
    shapeOpen: false,
    windOpen: false,
    email: '',
    name: '',
    imageURL: '',
    loggedIn: false,
    userID: ''
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
      const sessionData = {owner: this.state.email,
                          date: this.state.date,
                          location: this.state.location,
                          size: this.state.size,
                          shape: this.state.shape,
                          windDir: this.state.windDir
                        }
      const postURL = 'http://localhost:3001/sessions'
      axios.post(postURL,sessionData)
        .then((res) => {
              console.log(res);
            })
        .catch((err) => {
              console.log(err);
      });
      console.log("saved session to database")
    }else {
      console.log("could not validate data");
    }
  }

  loggedInView(){
    return(
      <Container maxWidth="lg">

        <Box  color="success.contrastText" p={2}>

          <h1>
            Session Logger
          </h1>

          <Avatar alt={this.state.name} src={this.state.imageURL} />

          <h4>
            {this.state.name}
          </h4>

          <h3>
            {this.state.email}
          </h3>



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

          <br/>
          <br/>

          <Button variant="contained" color="primary" onClick={this.submitData}>Save Session</Button>

          </Box>

          </Container>
    );
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

  notLoggedIn(){
        return(
            <div>
            <Container maxWidth="lg">
            <Box  color="success.contrastText" p={2}>
            <h1>
              Session Logger
            </h1>
            <GoogleLogin
            clientId="687641367817-phvujd6f7h6cs69sobr0hbjkme4kodt1.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
            />
            </Box>
            </Container>
            </div>

        );
      }

  checkForLogin(){
    if(this.state.loggedIn){
      return this.loggedInView();
    } else {
      return this.notLoggedIn();
    }

  }


  responseGoogle = (response) => {
          console.log(response);
          this.setState({email: response.profileObj.email, name: response.profileObj.name, imageURL: response.profileObj.imageUrl, loggedIn: true});
          // check if the user is in the database if not then add a new user
          const baseURL = 'http://localhost:3001/users/?email='
          const queryURL = baseURL + this.state.email;
          console.log(queryURL);
          //first check if user is in the database
          axios.get(queryURL)
                    .then((res) => {
                      console.log(res);
                      // if user is not in the database
                      if(res.data.length === 0){
                        //save user to database
                        console.log("saving user to database");
                        const postURL = baseURL + this.state.email +'&name=' + this.state.name
                        console.log(postURL);
                        axios.post(postURL)
                          .then((res) => {
                            console.log(res);
                            console.log("saved user to database");
                            this.setState({userID: res.data._id});
                          })
                          .catch((err) => {
                            console.log(err);
                          })
                      } else {
                        console.log("already in database");
                        this.setState({userID: res.data[0]._id});
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
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


  render () {


    return (
      <div className="App" >
        {this.checkForLogin()}
      </div>
    );
  }
}

export default App;
