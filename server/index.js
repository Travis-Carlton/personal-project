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
        expires: 1000*60*60*24*14
    }
  }));
  
app.use(express.static(`${__dirname}/../build`));

// signup and login //////////

app.post('/api/signup', (req,res)=>{
    // console.log('request body----',req.body)
    const db = req.app.get('db');
    const saltRounds = 12;
    const {username,password,firstName,lastName,bio,profilePic} = req.body;
    bcrypt.hash(password,saltRounds).then(hash =>{

        db.signup([username, hash, firstName, lastName, bio, profilePic]).then((user) => {
            // console.log('user info----',user);
            req.session.user = {id: user[0].id, username, firstName, lastName, bio, profilePic };
            res.json({ user: req.session.user })
          }).catch(error => {
          console.error('error', error);
          res.status(500).json({ message: ' in signup '})
        });
    })
});

app.post('/api/login', (req,res)=>{
    // console.log('---------login', req.body)
    const {username,password} = req.body;
    const db = req.app.get('db');
    db.get_user([username]).then(users => {
        if(users.length){
            bcrypt.compare(password,users[0].password).then(passwordsMatch => {

                if (passwordsMatch) {
                  req.session.user = { 
                      username: users[0].username, 
                      first: users[0].first_name,
                      last: users[0].last_name,
                      bio: users[0].bio,
                      pic: users[0].profile_pic,
                      id: users[0].id
                    };
                    // console.log(req.session)
                  res.json({ user: req.session.user });
                  console.log('Youre logged in!')
                } else {
                  res.status(403).json({ message: 'Wrong password' })
                }
              })

        } else {
            res.status(403).json({ message: "That user is not registered" })
          }
    });
});

app.post('/api/logout', (req,res)=>{
    req.session.destroy();
    res.status(200).send('hello')
});

//////////////////////////

//////////CompDidMounts
app.get('/api/data', (req,res)=>{
    const db = req.app.get('db');
    // console.log(req)
    db.content().then( response =>{
        // console.log(response)
        res.status(200).send(response)
    })
})


app.get('/api/auth', controller.loggedIn)
app.get('/api/getusers', controller.getUsers)
////////////////////////////

///////////Book related calls
app.get('/api/singleBook/:id', controller.singleBook);
app.post('/api/createbook', controller.createBook);
app.delete(`/api/deleteBook`, controller.deleteBook);
//////////////////////////////

///////////Page related calls
app.post('/api/createpage', controller.createPage)
app.post('/api/createnextpage', controller.createNextPage)
//////////////////////////////

//////////profile related calls
app.patch('/api/updatePic/:id', controller.updatePic)
/////////////////////////////

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 4000;
app.listen(PORT, ()=>{
    console.log(`Server in port ${PORT} 🦄`)
})
