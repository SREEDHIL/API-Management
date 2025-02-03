const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    dueDate:{
        type:Date
    },
    completed:{
        type:Boolean,
        default:false
    },
});

const Tasks = mongoose.model('taskCollection',taskSchema);
module.exports = {Tasks}
