import React from 'react';
import './Signup.scss';

const Signup = () => {
    return (
        <div className="signupp">
                <h1>SignUp</h1>
            <div className="signupc">
                <div className='signcc'>
                <label>Username: </label><input type="text" maxLength='15' minLength='5' required/>
                <label>Password: </label><input type="password" maxLength='15' minLength='5' required/>
                <label>Confirm password: </label><input type="password" maxLength='15' minLength='5' required/>
                <label>First Name: </label><input type="text"/>
                <label>Last Name: </label><input type="text"/>
                <label>Bio: </label><textarea cols="50" rows="2"></textarea>
                <button>SignUp</button>
                
                </div>
               
               
                {/* <div className='signcc'>
                
                </div> */}
                
            </div>
        </div>
    );
};

export default Signup;