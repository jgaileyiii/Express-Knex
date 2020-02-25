import React from 'react';
import './TeacherCard.css';

export default function TeacherCard(props) {
    

    const {teacher} = props 

    return(
        <div className="teacher-card">
            <div className="teacher-info">
                <h3>{teacher.name}</h3>
                <p>Instruments: {teacher.instruments}</p>
                <p>Styles: {teacher.style}</p>
                <a href={teacher.url}>Website</a>
            </div>
            <div className='teacher-bio'>
                <p>{teacher.bio}</p>
            </div>
        </div>
    )
}