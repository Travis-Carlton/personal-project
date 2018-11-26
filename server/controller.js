module.exports = {
    loggedIn: (req, res, next)=> {
        // console.log('-----------------',req.session.user)
            if (req.session.user) {
              res.status(200).send( req.session.user );
            } else {
            //   res.status(403).json({ message: 'Not logged in' });
            res.send('Not logged in')
            }
          },

    // getUsers: (req,res)=>{
    //     const db = req.app.get('db');
    //     // console.log(req.query)
    //     db.get_users([req.query.lusername]).then(response=>{
    //         // console.log('-------------' , req.query.username)

    //         response.length?res.status(500).send('username taken'):
    //         res.status(200).send('success')
    //     })        
    // },

//////////book functions
    singleBook: (req,res)=>{
        // console.log('PARAMS', req.params)
        // console.log('BODY', req.body)
        const db = req.app.get('db');
        const {id} = req.params;
        // const {uImage} = req.body;
        db.get_single_book([id]).then((response)=>{
            res.status(200).send(response)
        }).catch(error => {
            console.error('error', error);
            res.status(500).json({ message: ' in singlebook '})
          });

    },

    createBook: (req,res)=>{
        // console.log(req.body)
        const {userId,bookname,bookcover} = req.body;
        const db = req.app.get('db');
        db.create_book([bookname,bookcover,userId]).then(()=>{
           res.status(200).send('Success!')
        }).catch(error => {
          console.error('error', error);
          res.status(500).json({ message: ' in createbook '})
        });
    },

    deleteBook: (req,res)=>{
        const db = req.app.get('db');
        const {booktodelete} = req.query;
        // const {id} = req.body;
        // console.log('hitting delete',req.query.booktodelete);
        db.delete_book([booktodelete]).then(()=>{
            res.status(200).send('dlt scs')
        }).catch(error => {
            console.error('error', error);
            res.status(500).json({ message: ' in deletebook '})
          });
        
    },

    bookLike: (req,res)=>{
        const db = req.app.get('db');
        const {id,userId} = req.body;
        db.book_like([userId,id]).then(()=>{
            res.status(200).send('book liked!')
        });
        
    },
    bookUnlike: (req,res)=>{
        const db = req.app.get('db');
        const {bookid,userid} = req.params;
        db.book_unlike([bookid, userid]).then(()=>{
            // console.log('unliked'.req.params)
            res.status(200).send('book unliked!')
        });
    },

    pageCount: (req,res)=>{
        const db = req.app.get('db');
        const {bookid} = req.params;
        // console.log(req.params)
        db.page_count([bookid]).then((response)=>{
            res.status(200).send(response[0])
        });
    },

    commentCount: (req,res)=>{
        const db = req.app.get('db');
        const {pageid} = req.params;
        // console.log(req.params)
        db.comment_count([pageid]).then((response)=>{
            // console.log(response)
            res.status(200).send(response[0])
        });
    },
    likeCount: (req,res)=>{
        const db = req.app.get('db');
        const {bookid} = req.params;
        // console.log(req.params)
        db.book_like_count([bookid]).then((response)=>{
            // console.log(response[0])
            res.status(200).send(response[0])
        });
    },
    pageLikeCount: (req,res)=>{
        const db = req.app.get('db');
        const {pageid} = req.params;
        // console.log(req.params)
        db.page_like_count([pageid]).then((response)=>{
            res.status(200).send(response[0])
        });
    },

////////////post functions
    createPage: (req,res)=>{
        // console.log(req.body)
        const db = req.app.get('db');
        const { firstPage, userId, id, uDT} = req.body;
        db.create_page([ null, uDT, firstPage, userId, id ]).then((response)=>{
            // console.log('RESSSSSSS',response[0])
           res.status(200).json({postUser: response[0]})
        });
    },
    createNextPage: (req,res)=>{
        // console.log(req.body)
        const db = req.app.get('db');
        // console.log('-------createPage', req.body)
        const { nextPage, userId, bookid, uDT } = req.body;
        db.create_page([ null, uDT, nextPage, userId, bookid ]).then((response)=>{
            // console.log('RESSSSSSS',response[0])

           res.status(200).json({postUser: response[0]})
        });
    },
    pageLike: (req,res)=>{
        const db = req.app.get('db');
        const {userId,pageId} = req.body;
        db.page_like([userId,pageId]).then(()=>{
            res.status(200).send('page liked!')
        });
        
    },
    pageUnlike: (req,res)=>{
        const db = req.app.get('db');
        const {userid,pageid} = req.params;
        // console.log('--------------------',req.params)
        db.page_unlike([pageid,userid]).then(()=>{
            res.status(200).send('page unliked!')
        });
        
    },



////////////// comments
    prevComments: (req,res)=>{
        const db = req.app.get('db');
        const {pageid} = req.params;
        db.get_previous_comments([pageid]).then((response)=>{
            // console.log(response)
            res.status(200).send(response)
        }).catch(error => {
            console.error('error', error);
            res.status(500).json({ message: ' in prevComments '})
          });      
    },
/////////////////////////////


////////////profile functions
    updatePic: (req,res)=>{
        // console.log('PARAMS', req.params)
        // console.log('BODY', req.body)
        const db = req.app.get('db');
        const {id} = req.params;
        const {uImage} = req.body;
        db.edit_profile_pic([uImage,id]).then((response)=>{
            req.session.user.pic = response[0].profile_pic;
            res.status(200).json({image: response[0].profile_pic})
            // console.log('', response[0].profile_pic)
            
        })

    },

    getUserContent: (req,res)=>{
        const db = req.app.get('db');
        const {userid} = req.params;
        // console.log('>>>>>>',req.params)
        db.get_user_books([userid]).then(response1=>{
            db.get_user_posts([userid]).then(response2=>{
                res.status(200).json({ userBooks: response1, userPosts: response2})
            }).catch(err=>console.error('in get user content posts',err));
        }).catch(err=>console.error('in get user content',err));
    },

    profileEdit: (req,res)=>{
        const db = req.app.get('db');
        // console.log('--------',req.body)
        const { userId, firstName, lastName, bio, profilePic, email } = req.body;
        db.profile_edit_page([userId,firstName,lastName,bio,profilePic,email]).then(response=>{
            // console.log('-------',response[0])
            // req.session.user = {
            // id: response[0].id,
            // firstName: response[0].first_name,
            // lastName: response[0].last_name,
            // bio: response[0].bio,
            // profilePicture: response[0].profile_pic,
            // email: response[0].user_email
            // }
                req.session.destroy();
            //   res.status(200).json({ user: req.session.user })
            //   console.log('{{{{{{{{',req.session)
        })
    },

    checkForUserAndEmail: (req,res)=>{
        const db = req.app.get('db');
        const {username,email} = req.params;
        // console.log('?????',req.params);
        db.check_forgot_password([username,email]).then(response=>{
            console.log(response[0])
            if(response[0].count == 1){
                res.status(200).send('correct')
            } else {
                res.status(200).send('incorrect')
            }
        })
    }


}