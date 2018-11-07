module.exports = {
    loggedIn: (req, res, next)=> {
        // console.log('-----------------',req.session.user)
            if (req.session.user) {
              res.status(200).send( req.session.user );
            } else {
              res.status(403).json({ message: 'Not logged in' });
            }
          },

    getUsers: (req,res)=>{
        const db = req.app.get('db');
        // console.log(req.query)
        db.get_users([req.query.lusername]).then(response=>{
            // console.log('-------------' , req.query.username)

            response.length?res.status(500).send('username taken'):
            res.status(200).send('success')
        })        
    },

//////////book functions
    singleBook: (req,res)=>{
        // console.log('PARAMS', req.params)
        // console.log('BODY', req.body)
        const db = req.app.get('db');
        const {id} = req.params;
        // const {uImage} = req.body;
        db.get_single_book([id]).then((response)=>{
            // console.log(pages[0])
            // console.log(response)
            res.status(200).send(response)
        })

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
        })
        
    },

////////////post functions
    createPage: (req,res)=>{
        // console.log(req.body)
        const db = req.app.get('db');
        // console.log('-------createPage', req.body)
        const { firstPage, userId, id } = req.body;
        db.create_page([ null, null, firstPage, userId, id ]).then((response)=>{
            // console.log('RESSSSSSS',response[0])
           res.status(200).json({postUser: response[0]})
        })
        .catch(error => {
          console.error('error in  create page', error);
          res.status(500).json({ message: ' in createPage '})
        });
    },


////////////profile functions
    updatePic: (req,res)=>{
        // console.log('PARAMS', req.params)
        // console.log('BODY', req.body)
        const db = req.app.get('db');
        const {userId} = req.params;
        const {uImage} = req.body;
        db.edit_profile_pic([uImage,userId]).then(()=>{
            res.status(200).json({image: uImage})
        })

    }


}