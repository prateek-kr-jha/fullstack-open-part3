require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/phonebook');
console.log(Person, "---------");

morgan.token('body', req => {
    return req.body ? JSON.stringify(req.body) : '-';
})

app.use(express.json());
app.use(express.static('dist'));
app.use(cors());
app.use(morgan(':method :url Status: :status :req[header] :response-time[decimal] ms :body'));

const errorHandler = (error, req, res, next) => {
    console.log(error.message, "error");
    if(error.name === 'CastError') {
        return res.status(400).send({error: 'malformed id'});
    }
    next(error);
}
app.get('/api/persons', (req, resp) => {
    Person.find({}).then(persons => {
        console.log(persons);
        resp.status(200).send(persons);
    })
})

// app.get('/info', (req, res) => {
//     const dateString = new Date(Date.now());
//     const infoHtmlString = `<p><em>Phonebook has info for ${persons.length} people</em></p>
//     <p><em>${dateString}</em></p>`;

//     res.status(200).send(infoHtmlString);
// })


app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    console.log(id, "------");

    Person.findById(id).then(person => {
        if(person) {
            return res.status(200).send(person);
        }
        res.statusMessage = "person with this id doesn't exist";
        return res.status(404).end();
    }).catch(e => {
        // console.log(e, "error");
        // return res.status(400).send({error: "malformed id"});
        next(e);
    })

})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    console.log(id, "------");
    // persons = persons.filter(person => person.id === id);

    return res.status(204).end();
})


app.post('/api/persons/', (req, res) => {
    const body = req.body;

    if (!body || !body.name || !body.number) {
        return res.status(400).json({
            error: "name or number missing"
        })
    }

    Person.findOne({name: body.name}).then(person => {
        if(person) {
            return res.status(406).json({
                error: "name should be unique"
            })
        }

        console.log("here is me");
        const newPerson = new Person({
            name: body.name,
            number: body.number
        })
        // persons = persons.concat(newPerson);
    
        newPerson.save().then(newPersonEntry => {
            return res.status(200).json(newPersonEntry);
        }).catch(e => {
            console.log(e, "error");
            return res.status(500).json({
                error: "error in saving"
            })
        })
    })



})
// TODO: put and delete
app.use(errorHandler);
const PORT = 3002;

app.listen(PORT, () => {
    console.log('App listening on ' + PORT);
})
