const express = require('express');
const router = express.Router();

//get all courses
router.get('/api/courses', (req, res) => {
    res.send(courses);

})



const courses = [

    {id: 1, name: 'Algebra 101'},
    {id: 2, name: 'Calculus 426'},
    {id: 3, name: 'Linear Matrices'}

];

router.post('/', (req, res) => {

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


router.put('/:id', (req, res) => {

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
router.get('/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("Course not found");
    res.send(course);
});


module.exports = router;