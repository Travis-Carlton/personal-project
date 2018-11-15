import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import CreateEpic from './components/CreateEpic/CreateEpic';
import Profile from './components/Profile/Profile';
import Pages from './components/Pages/Pages';
// import Contact from './components/Contact/Contact';
import Comments from './components/Comments/Comments';
import Fun from './components/Fun/Fun';

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/about' component={About}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/createepic' component={CreateEpic}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/book/:bookid/pages' component={Pages}/>
        {/* <Route path='/contact' component={Contact}/> */}
        <Route path='/page/:pageid/comments' component={Comments}/>
        {/* <Route path='/fun_fun' component={Fun}/> */}

    </Switch>
)