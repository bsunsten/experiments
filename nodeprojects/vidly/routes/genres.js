const express = require('express');
const router = express.Router();

const genres = [

    {id: 1, name: 'horror'},
    {id: 2, name: 'thriller'},
    {id: 3, name: 'action'},
    {id: 4, name: 'romance'}

];


router.get('/', (req, res) =>{
    console.log("Recieved genre request");
    res.send(genres);
});

router.get('/:name', (req, res) => {


    var genre =  genres.find(c => c.name === req.params.name);

    if(!genre) res.status(404).send("Genre with specified name not found");
    

    res.send(genre)

});

router.post('/', (req, res) => {

    //validate to see if name exists in body
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);


});

router.put('/:name', (req, res) =>{


    var genre =  genres.find(c => c.name === req.params.name);
    genre.name = req.body.name;

    res.send(genre);
});


router.delete('/:name', (req, res) => {

    var genre =  genres.find(c => c.name === req.params.name);

    if (!genre) res.status(404).send("Genre for deletion could not be found");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);

});

module.exports = router;