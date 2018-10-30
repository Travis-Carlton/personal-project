import React from 'react';
import './Login.scss';

const Login = () => {
    return (
        <div className="loginp">
                <h1>Login</h1>
            <div className="loginc">
                
                <label>Username: </label><input type="text" maxLength='15' minLength='5' required/>
                <label>Password: </label><input type="password" maxLength='15' minLength='5' required/>
                <button>Login</button>
            
            </div>
        </div>
    );
};

export default Login;