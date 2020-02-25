import React, { Component } from 'react';
import "./Signup.css";

export default class Signup extends Component{

    state = {
        user: {
            userName: '',
            password: ''
        },
        newUser: {
            newUserName: '',
            email: '',
            password: ''
        }
    }

    postUser = () => {
        const { newUserName, email, password } = this.state.newUser
        const username = newUserName
        fetch('http://localhost:3000/api/v1/users', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, password})
        })
    }



    handleSignupChange = property => event => {
        const newUser = this.state.newUser
        newUser[property] = event.target.value
        this.setState({ newUser })
    }

    handleLoginChange = property => event => {
        const user = this.state.user
        user[property] = event.target.value
        this.setState({ user })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.postUser()
        this.setState({
            newUser: {
                newUserName: '',
                email: '',
                password: ''
            }
        })
    }

    handleLogin = event => {
        event.preventDefault()
        const { userName } = this.state.user
        this.props.login(userName)
        this.setState({user: {
            userName: '',
            password: ''
            }
        })
    }

    render(){
        return(
               this.props.loggedIn === true ? null   
                :   <div className="signup">
                        <h3>Signup</h3>
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" value={this.state.newUser.newUserName} 
                                    onChange={this.handleSignupChange('newUserName')} 
                                    placeholder="Enter Username"/>
                                <input type="text" 
                                    value={this.state.newUser.email} 
                                    onChange={this.handleSignupChange('email')} 
                                    placeholder="Enter E-mail"/>
                                <input type="password" 
                                    value={this.state.newUser.password} 
                                    onChange={this.handleSignupChange('password')} 
                                    placeholder="Enter Password"/>
                                <input type="submit"  value="Sign Up"/>
                            </form>
                        <h3>Login</h3>    
                        <form onSubmit={this.handleLogin}>
                            <input type="text" 
                                value={this.state.user.userName} 
                                onChange={this.handleLoginChange('userName')} 
                                placeholder="Enter Username"
                            />
                            <input type="password" 
                                value={this.state.user.password} 
                                onChange={this.handleLoginChange('password')} 
                                placeholder="Enter Password"
                            />
                            <input type="submit"  value="Login"/>
                         </form>
                </div>
        )     
    }
}
