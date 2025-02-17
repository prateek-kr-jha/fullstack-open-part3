const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', url);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String

})

personSchema.set('toJSON', {
    transform: (doc, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
    }
})

module.export = mongoose.model("Person", personSchema);

