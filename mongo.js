require('dotenv').config();
const mongoose = require('mongoose');

// if(process.argv.length < 3) {
//     console.log("give password as argument");
//     process.exit(1);
// }

// console.log(process.argv);
const generateId = () => {
    return parseInt(Math.random() * 100000)
}

// const password = encodeURIComponent(process.argv[2]);
// console.log(process.env.MONGODB_URI);
const url = process.env.MONGODB_URI;
//   `mongodb+srv://fullstack:${password}@cluster0.2psjv.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;// Pikachu18%40
// console.log(url);
mongoose.set('strictQuery', url);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String

})

const Person = mongoose.model("Person", personSchema);

// if(process.argv.length == 5) {
//     const person = new Person({
//         id: generateId(),
//         name: process.argv[3],
//         number: process.argv[4]
//     })

//     person.save().then(data => {
//         console.log(data);
//         mongoose.connection.close();
//     })
// }

// if(process.argv.length == 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person);
        })
        mongoose.connection.close();
    })
// }