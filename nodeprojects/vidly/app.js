const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json);

const genres = [

    {genreName: 'horror'},
    {genreName: 'thriller'},
    {genreName: 'action'},
    {genreName: 'romcom'},
    {genreName: 'drama'},

]

app.get('/', (req, res) => {
    res.send("This is working!");
_});


app.get('/api/genres', (req, res) => {

    res.send(genres)

});

app.get('/api/genres/:genreName', (req, res) => {

    const genre = genres.find(c => c.genreName === req.params.genreName)

    if (!genre) res.status(404).send('Genre not found');

    res.send(genre)

});

app.post('/api/genres/:genreName', (req, res) => {

    //validate given request body
    var { error } = validateGenre(req.body);

    //give error if invalid
    if (error) return req.status(400).send('Please use a valid genre');

    //create new object using request body
    const genre = {
        genreName: req.body.genreName
    };


    //send a copy of that object
    genres.push(genre);
    res.send(genre);

});


function validateGenre(genre){

    const schema = Joi.object({
        genreName: Joi.string().min(1).required()
    });

    return schema.validate(genre);

}



const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));