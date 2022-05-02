const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground') //in prod, use a config file for this db connection string
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log('Couldnt connect to mongodb \:\( ' + err ));

const courseSchema = new mongoose.Schema({

    name: String,
    author: String,
    tags: [ String ], 
    date: { type: Date, default: Date.now},
    isPublished: Boolean

});

const Course = mongoose.model('Course', courseSchema); //model functions as a class using the defined schema


async function createCourse() {

    //this code defines an individual document that will be stored in the database
    const course = new Course({
        name: 'React Course',
        author: 'BrodyS',
        tags: ['javascript', 'react', 'frontend'],
        isPublished: true
    });


    const result = await course.save(); //async operation, so method returns a prmoise.
    console.log(result);

}

async function getCourses() {

   const courses = await Course.find();
   console.log(courses);

}



getCourses();
