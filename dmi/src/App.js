import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './App.css';
import TeacherList from './components/TeacherList'
import Signup from './components/Signup'
import AddTeacher from './components/AddTeacher'

class App extends Component {

    state = {
      user: "",
      loggedIn: null
    }
    
    login = (userName) => {
      this.setState({ user: userName, loggedIn: true })  
    }
    

    reset = () => {
      this.setState({
        user: "",
        loggedIn: null
      })
    }

    showUser = () => {
      return (this.state.loggedIn === true?
        <div>
          <p>{this.state.user}</p>
          <button onClick={this.reset}>Logout</button>
        </div>
        : null
      )
    }

    render(){
      return (
        <div className="App">
          <header>
            <div className="title-login">
              <h1>EXPRESSKNEX</h1>
              <div className="show-user">{this.showUser()}</div>
            </div>
            <Router>
              <div className='nav'>
                  <Link className='link' to="/">Home</Link>
                  <Link className='link' to="/AddTeacher/">Add Teacher</Link>
                  <Link className='link' to="/TeacherList/">Find Teacher By Instrument</Link>
                  <Link className='link' to="/Signup/">Sign Up or Login</Link>
              </div>
              <Switch>
                  <Route path='/AddTeacher/' component={AddTeacher} />
                  <Route path="/TeacherList/" component={TeacherList}/>
                  <Route path="/Signup/" render={(props) => 
                    <Signup {...props}
                      login = {this.login}
                      loggedIn = {this.state.loggedIn}
                    />}/>
              </Switch>
            </Router>
          </header>
        </div>
        );
    }
}

export default App;
