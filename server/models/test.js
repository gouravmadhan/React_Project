const mongoose = require('mongoose');
const schema1 = new mongoose.Schema({
    testKey :  String,
    test    : {type:Array},
    correctOption : {type:Array}
})

const questionSet = mongoose.model("questionSet",schema1);

module.exports = questionSet;
