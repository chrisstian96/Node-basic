const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    color:  String,
    plate: String,
    brand: String,
    model: String,
    seller:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Car = mongoose.model('car', carSchema);
module.exports = Car;