const mongoose = require('mongoose');
const schema2 = new mongoose.Schema({
    testKey : String,
    answers    : {type:Array}
})

const answerSet = mongoose.model("answerSet",schema2);

module.exports = answerSet;
