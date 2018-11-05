module.exports = {
    loggedIn: (req, res, next)=> {
        console.log('-----------------',req.session.user)
            if (req.session.user) {
              res.status(200).send( req.session.user );
            } else {
              res.status(403).json({ message: 'Not logged in' });
            }
          },

//////////book functions
    createBook: (req,res)=>{
        // console.log(req.body)
        const {id,bookname,bookcover} = req.body;
        const db = req.app.get('db');
        db.create_book([bookname,bookcover,id]).then(()=>{
           res.status(200).send('Success!')
        }).catch(error => {
          console.error('error', error);
          res.status(500).json({ message: ' in createbook '})
        });
    },

    deleteBook: (req,res)=>{
        const db = req.app.get('db');
        const {booktodelete} = req.query;
        // console.log('hitting delete',req.query.booktodelete);
        db.delete_book([booktodelete]).then(()=>{
            res.status(200).send('dlt scs')
        })
        
    },

////////////post functions
    createPost: (req,res)=>{
        // console.log(req.body)
        const {post} = req.body;
        const db = req.app.get('db');
        db.create_post([post]).then((response)=>{
           res.status(200).send('Success!')
        }).catch(error => {
          console.error('error', error);
          res.status(500).json({ message: ' in createpost '})
        });
    },


////////////profile functions
    updatePic: (req,res)=>{
        console.log('PARAMS', req.params)
        console.log('BODY', req.body)
        const db = req.app.get('db');
        const {id} = req.params;
        const {uImage} = req.body;
        db.edit_profile_pic([uImage,id]).then(()=>{
            res.status(200).json({image: uImage})
        })

    }


}