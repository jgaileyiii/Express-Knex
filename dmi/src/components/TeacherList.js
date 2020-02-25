import React, {Component} from 'react'
import TeacherCard from './TeacherCard'
import './TeacherList.css';


export default class TeacherList extends Component {

    state = {
        allTeachers: [],
        searchTerm: ''
    }

    componentDidMount(){
        fetch('http://localhost:3000/api/v1/teachers')
          .then(response => response.json())
          .then(teacher => {
            this.setState({ allTeachers:  teacher})
          })
    }

    updateSearchTerm = event => {
        this.setState({
            searchTerm: event.target.value.trim(''),
        })
    }


    listTeachers = () => this.state.allTeachers
        .filter(teacher => teacher.instruments && teacher.style)
        .filter(teacher => {
            return (teacher.instruments.toLowerCase()
                .includes(this.state.searchTerm.toLowerCase())
            ) || (teacher.style.toLowerCase()
                .includes(this.state.searchTerm.toLowerCase())
            )
        }).map(teacher => {
                return (
                    <TeacherCard
                        teacher = {teacher}
                    />
                )
        })


    render(){
        return(
            <div>
                    <form  className="search-form">
                        <input
                            type="text"
                            placeholder="Search by Style or Instrument"
                            value={this.searchTerm}
                            onChange={this.updateSearchTerm}
                        />
                    </form>
                <div className="teacher-list">{this.listTeachers()}</div>
            </div>
        )
    }
}