import React from 'react';
import './About.scss';

const style = {
    height: '40px'
}
const About = () => {

    let contactForm = ()=>{
         window.open('./contact', '', 'width=500, height=500, left=550, top=200');
    }

    return (
        <div className="aboutp">
        <div className="aboutc">
            <h1 className='abouth1'>About</h1>
            <p>Start epic stories with a cover photo and starting page. Then the story will unfold one page at a time as each user who posts sees fit.</p>
            <div style={style}><button style={{cursor:'pointer'}} onClick={contactForm} className='contactbtn'>Contact</button></div>
        </div>
        </div>
    );
};

export default About;