module.exports = {

    createBook: (req,res)=>{
        // console.log(req.body)
        const {bookname,bookcover} = req.body;
        const db = req.app.get('db');
        db.create_book([bookname,bookcover]).then(()=>{
           res.status(200).send('Success!')
        }).catch(error => {
          console.error('error', error);
          res.status(500).json({ message: ' in createbook '})
        });
    },

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

    deleteBook: (req,res)=>{
        const db = req.app.get('db');
        const {booktodelete} = req.query;
        // console.log('hitting delete',req.query.booktodelete);
        db.delete_book([booktodelete]).then(()=>{
            res.status(200).send('dlt scs')
        })
        
    }



}