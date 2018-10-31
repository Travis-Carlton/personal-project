module.exports = {

    createBook: (req,res)=>{
        console.log(req.body)
        const {bookname} = req.body;
        const db = req.app.get('db');
        db.create_book([bookname]).then((response)=>{
           res.status(200).send('Success!')
        }).catch(error => {
          console.error('error', error);
          res.status(500).json({ message: ' in createbook '})
        });
    },
    createPost: (req,res)=>{
        console.log(req.body)
        const {post} = req.body;
        const db = req.app.get('db');
        db.create_book([post]).then((response)=>{
           res.status(200).send('Success!')
        }).catch(error => {
          console.error('error', error);
          res.status(500).json({ message: ' in createpost '})
        });
    }



}