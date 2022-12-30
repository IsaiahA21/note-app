const mongooseDB = require('mongoose'); // const mongoose is a vairbale that uses the npm mongoose, to use MongoDB

// the scehma is the structure of a data we are going to be recieveing from the database
const NoteSchema = new mongooseDB.Schema({
    title: {
        type: String,
        required: [true,'Please add a tilte'],// required is meant for validation. title is required else we print the message 'please add a title'
        unique: true,
        trim: true, //white spaces will be removed from both sides of the string
        maxlength: [40, 'Title cannot be more than 40 characters']
    },
    description: {
        type: String,
        reuqired: true,
        maxlength: [200, 'Description cannot be more than 200 characters']
    }
})

//export the schema.
//if mongoose.model.Note exisit already, then we export that
//else, we create the model Note and pass the schema definition
module.exports = mongooseDB.models.Note ||  mongooseDB.model('Note', NoteSchema);