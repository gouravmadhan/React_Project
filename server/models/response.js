const mongoose = require('mongoose');
const schema3 = new mongoose.Schema({
    testKey : String,
    responses    : {type:Array}
})

const response = mongoose.model("response",schema3);

module.exports = response;
