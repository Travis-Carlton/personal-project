const express = require('express');
const bP = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// controllers
const controller = require('./controller.js');

massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database);
}).catch(error => {
    console.log('error with massive', error);
});

const app = express();
app.use(bP.json());

app.use(session({
    secret: process.env.SECRET_SESSION,
    saveUninitialized: false,
    resave: false,
    cookie: {
        expires: 1000*60*2
    }
  }));
  
app.use(express.static(`${__dirname}/../build`));

// signup and login
app.post('/signup', (req,res)=>{
    console.log(req.body)
    const db = req.app.get('db');
    const saltRounds = 12;
    const {username,password,first_name,last_name,bio,profile_pic} = req.body;
    bcrypt.hash(password,saltRounds).then(hash =>{

        db.signup([username, hash, first_name, last_name, bio]).then(() => {
            console.log()
            req.session.user = { username };
            res.json({ user: req.session.user })
          }).catch(error => {
          console.error('error', error);
          res.status(500).json({ message: ' in signup '})
        });
})
});


app.post('/createbook', controller.createBook)

const PORT = 4000;
app.listen(PORT, ()=>{
    console.log(`Server in port ${PORT} 🦄`)
})
