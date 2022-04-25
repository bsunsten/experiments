const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const logger = require('./logger')
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded( {extended: true }));
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(logger);


const courses = [

    {id: 1, name: 'Algebra 101'},
    {id: 2, name: 'Calculus 426'},
    {id: 3, name: 'Linear Matrices'}

];

app.get('/', (req, res) => {
    res.send('Hello Express!!!!');
});


//get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);

})

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }



    const course = {
      id: courses.length + 1,
      name: req.body.name  
    };

    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {

    //look up course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course not found');

    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);

});

function validateCourse(course){

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}


//get individual course by ID
app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("Course not found");
    res.send(course);
});

const port = process.env.PORT || 3000;

//console.log(process.env)

app.listen(port, () => console.log(`listening on port ${port}...`));