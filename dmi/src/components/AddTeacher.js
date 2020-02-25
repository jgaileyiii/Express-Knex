import React, { Component } from 'react'
import './AddTeacher.css'


export default class AddTeacher extends Component {

    state = {
        teacher : {
            name: '',
            bio: '',
            instruments: '',
            style: '',
            url: '',
            phone_number: '',
            email: ''
        }
    }

    handleSignupChange = property => event => {
        const teacher = this.state.teacher
        teacher[property] = event.target.value
        this.setState({ teacher })
    }

    postTeacher = () => {
        const { name, bio, instruments, style, url, phone_number, email  } = this.state.teacher
        fetch('http://localhost:3000/api/v1/teachers', {
            method: "POST",
            headers: {
                'Content-type' : 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({name, bio, instruments, style, url, phone_number, email})
        })
    }

    handleSubmit = () => {
        this.postTeacher()
        this.setState({ teacher: {
            name: '',
            bio: '',
            instruments: '',
            style: '',
            url: '',
            phone_number: '',
            email: ''
            }
        })
    }

    render(){
    return(
        <div className='add-teacher-form'>
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" onChange={this.handleSignupChange('name')} placeholder="Name"/>
                <input type="text" name="bio" onChange={this.handleSignupChange('bio')} placeholder="Add Bio"/>
                <input type="text" name="instruments" onChange={this.handleSignupChange('instruments')} placeholder="Instrument(s)"/>
                <input type="text" name="style" onChange={this.handleSignupChange('style')} placeholder="Styles Played"/>
                <input type="text" name="url" onChange={this.handleSignupChange('url')} placeholder="Website"/>
                <input type="text" name="phone_number" onChange={this.handleSignupChange('phone_number')} placeholder="Phone Number"/>
                <input type="text" name="email" onChange={this.handleSignupChange('email')} placeholder="E-Mail"/>
                <input type="submit" value="Add Teacher"/>
            </form>
        </div>
        )
    }
}