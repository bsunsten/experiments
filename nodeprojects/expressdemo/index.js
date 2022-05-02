
//Declare packages and set up express
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger')
const app = express();

const courses = ('./routes/courses');
const homepage = ('./routes/homepage');

console.clear(); 

//middleware
app.use(express.json());
app.use(express.urlencoded( {extended: true }));
app.use(express.static('public'));

app.use('/api/courses', courses); //for any api calls that use 1st arg's url, check in 2nd arg's module
app.use('/', homepage);

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server Name: ' + config.get('mail.host'));
console.log("Mail Password: " + config.get('mail.password'));


//check environment
if(app.get('env') === 'development'){
app.use(morgan('tiny'));
startupDebugger('Morgan Enabled');
}

const port = process.env.PORT || 3000;

//console.log(process.env)

app.listen(port, () => console.log(`listening on port ${port}...`));