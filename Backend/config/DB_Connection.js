const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// mongoose.connect('mongodb://localhost:27017/NotesReact')
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err);
})