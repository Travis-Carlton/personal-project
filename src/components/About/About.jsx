import React from 'react';
import './About.scss';


const About = () => {

    let contactForm = ()=>{
         window.open('./contact', '', 'width=300, height=500, left=550, top=200');
    }

    return (
        <div className="aboutp">
        <div className="aboutc">
            <h1 className='abouth1'>About</h1>
            <p>Start epic stories with a cover photo and starting page. Then the story will unfold one page at a time as each user who posts sees fit.</p>
            <div><button style={{cursor:'pointer'}} onClick={contactForm} className='contactbtn'>Contact</button></div>
        </div>
        </div>
    );
};

export default About;