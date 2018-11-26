const express = require('express');
const bP = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const nodemailer = require('nodemailer');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// const server = require('http').createServer()
// const io = require('socket.io')(server)

// controllers
const controller = require('./controller.js');
const creds = require('../config/config.js');


massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database);
}).catch(error => {
    console.log('error with massive', error);
});

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

///////// Sockets.io  /////////

io.sockets.on('connection', (socket) =>{
    console.log('user connected')


    socket.on('message', (msg) => {
        // console.log(msg)
        const db = app.get('db');
        const {message, userId, lusername, profilePic, pageid} = msg;


        db.create_comment([userId,pageid,message,lusername,profilePic]).then(() => {
        io.emit('messageFromServer', msg);}
        ).catch(err => console.log(err))
    })

    socket.on('typing', (typing)=>{
      // console.log(typing.lusername)
      console.log(typing)
      let typingUser = typing.lusername;
      let erased = typing.erased;
      // let typingID = typing.userId;
      // if()
      io.emit('userTyping', {typingUser})
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})



///////////////////////////////

// signup and login //////////

app.post('/api/signup', (req,res)=>{
    // console.log('request body----',req.body)
    const db = req.app.get('db');
    const saltRounds = 12;
    const {username,password,firstName,lastName,bio,profilePic,email} = req.body;
    let profilePicture = ()=>{
        if(profilePic.length<7){
            return 'https://d28sdlh8venwby.cloudfront.net/assets/missing-profile-326c4759d9ad53fa5bc720276bfe604c25a0c53c37b314eeef1bfa2cc1c5c514.png'
        } else return profilePic
    }

    db.username_check([username]).then(resp => {
      // console.log(resp[0])
      if(resp[0].count  >= 1){
        res.send('username already exists')
        // console.log('bad')
      } else {
        // console.log('all good!')
            bcrypt.hash(password,saltRounds).then(hash =>{

        db.signup([username, hash, firstName, lastName, bio, profilePicture, email]).then((user) => {
            // console.log('user info----',user);
            req.session.user = {id: user[0].id, username: user[0].username, 
              firstName: user[0].first_name, lastName: user[0].last_name, bio: user[0].bio, 
              profilePicture: user[0].profile_pic, email: user[0].user_email };
            res.json({ user: req.session.user })
          }).catch(error => {
          console.error('error', error);
          res.status(500).json({ message: ' in signup '})
        });
    })
      }
    })

    // bcrypt.hash(password,saltRounds).then(hash =>{

    //     db.signup([username, hash, firstName, lastName, bio, profilePicture]).then((user) => {
    //         // console.log('user info----',user);
    //         req.session.user = {id: user[0].id, username, firstName, lastName, bio, profilePicture };
    //         res.json({ user: req.session.user })
    //       }).catch(error => {
    //       console.error('error', error);
    //       res.status(500).json({ message: ' in signup '})
    //     });
    // })
});

app.post('/api/login', (req,res)=>{
    // console.log('---------login', req.session)
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
                      email: users[0].user_email,
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
    }).catch(err => console.log(err));
});

app.post('/api/logout', (req,res)=>{
    req.session.destroy();
    res.status(200).send('hello')
});

//////////////////////////

////////// Nodemailer

const transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

const transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});


app.post('/api/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n message: ${message} `
  
    var mail = {
      from: name,
      to: 'tc.comic.site@gmail.com',  //Change to email address that you want to receive messages on
      subject: 'New Message from Contact Form',
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })

  app.post('/api/sendNewUser', (req, res, next) => {
      // console.log(req.body)
    let { username, firstName, lastName, bio, profilePic } = req.body;
    let content = `username: ${username} \n name: ${firstName + ' ' + lastName}  \n bio: ${bio} \n profile pic: ${profilePic} `
  
    let mail = {
      from: firstName + ' ' + lastName,
      to: 'tc.comic.site@gmail.com',  //Change to email address that you want to receive messages on
      subject: 'New User at TCCOMIC.com',
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })

  app.post('/api/sendNewBook', (req, res, next) => {
    console.log(req.body)
  let { userId, bookname, bookcover, firstPage } = req.body;
  let content = `user id: ${userId} \n bookname: ${bookname}  \n bookcover: ${bookcover} \n first page: ${firstPage} `

  let mail = {
    from: userId,
    to: 'tc.comic.site@gmail.com',  //Change to email address that you want to receive messages on
    subject: 'New Book at TCCOMIC.com',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

app.post('/api/sendNewPage', (req, res, next) => {
    console.log(req.body)
  let { lusername, nextPage, userId, bookid } = req.body;
  let content = `username: ${lusername} \n user id: ${userId} \n next page: ${nextPage}  \n book id: ${bookid} `

  let mail = {
    from: lusername,
    to: 'tc.comic.site@gmail.com',  //Change to email address that you want to receive messages on
    subject: 'New Page at TCCOMIC.com',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})


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
app.get('/api/alllikes/:userid', (req,res)=>{
  const db = req.app.get('db');
  const { userid } = req.params;
  // console.log(req.params);

  db.all_likes([userid]).then((response)=>{
    db.all_page_likes([userid]).then(response2=>{
      // console.log('boooooks',response);
      // console.log('paaaages',response2);
      res.status(200).json({booklikes: response, postlikes: response2})
    })
  })
 
  // console.log(booklikes)
  // res.status(200).json({booklikes,postlikes})
  
})

app.get(`/api/:pageid/prevcomments`, controller.prevComments);
app.get(`/api/:bookid/pagecount`, controller.pageCount);
app.get(`/api/page/:pageid/commentcount`, controller.commentCount);
app.get(`/api/:bookid/likecount`, controller.likeCount);
app.get(`/api/page/:pageid/pagelikecount`, controller.pageLikeCount);


// console.log(Date())



app.get('/api/auth', controller.loggedIn)
// app.get('/api/getusers', controller.getUsers)
////////////////////////////

///////////Book related calls
app.get('/api/singleBook/:id', controller.singleBook);
app.post('/api/createbook', controller.createBook);
app.delete(`/api/deleteBook`, controller.deleteBook);
app.post(`/api/booklike`, controller.bookLike);
app.delete(`/api/bookunlike/:bookid/:userid`, controller.bookUnlike);
//////////////////////////////

///////////Page related calls
app.post('/api/createpage', controller.createPage);
app.post('/api/createnextpage', controller.createNextPage);
app.post(`/api/pagelike`, controller.pageLike);
app.delete(`/api/pageunlike/:pageid/:userid`, controller.pageUnlike);
//////////////////////////////

//////////profile related calls
app.patch('/api/updatePic/:id', controller.updatePic);
app.get(`/api/getusercontent/:userid`, controller.getUserContent);
app.put(`/api/profile/edit`, controller.profileEdit);
app.get(`/api/:username/:email`, controller.checkForUserAndEmail);
app.patch(`/api/newpassword`, (req,res)=>{
    const db = req.app.get('db');
    const saltRounds = 12;
    const { password, username, email } = req.body;
    console.log('>>>>>>',req.body)

    bcrypt.hash(password,saltRounds).then(hash =>{

      db.new_password([hash,username,email]).then(response=>{
        res.status(200).send('success')
      })
    })
});
/////////////////////////////

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

server.listen(4000,()=>{
    console.log('listening on 4000 🦖');
})