const express = require('express');
const app = express();
const users = require('./views/users');
const admins = require('./views/admins');
const history = require('./views/history');
const certificates = require('./views/certificates');
const addbiz = require('./views/addtoBiz');
const attendance = require('./views/attendance');
app.use(express.json());
app.use

const courses = [
    {id: 1, name: 'English'},
    {id: 2, name: 'PF 1'},
    {id: 3, name: 'OOP'},
    {id: 4, name: 'DSA'},
];

app.use('/api/admins', admins);
app.use('/api/users', users);
app.use('/api/history', history);
app.use('/api/certificates', certificates);
app.use('/api/addtobiz', addbiz);
app.use('/api/attendance', attendance);

app.get('/', (req, res) => {
    res.write("Hello World");
    res.end();
})

app.get('/:id', (req, res) => {
    res.send(req.params.id);
    res.end();
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    
    const course = {
        id: courses.length+1,
        name: req.body.name,
    }

    courses.push(course);
    res.status(200).send(course);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt( req.params.id));
    if(!course) res.send("The Course id you are trying to find was not found");
    else res.send(course);
    res.end();
})

app.get('/:year/:month/:day', (req, res) => {
    res.send(req.params);
    res.end();
})

app.listen(3000, () => {
    console.log("Listening to the port 3000...")
});