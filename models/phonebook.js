const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
console.log(url, 'URL--------');
mongoose.set('strictQuery', url);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    id: String,
    name: {
        type:String,
        minlength: 3,
        required: true
    },
    number: String

})

personSchema.set('toJSON', {
    transform: (doc, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
    }
})

module.exports = mongoose.model('Person', personSchema);

