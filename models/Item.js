const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: number, 
        required: true
    },
    country: {
        type: String,
        default: Indonesia
    },
    City: {
        type: String,
        required: true
    },
    isPopuler:{
        type: Boolean
    },
    description:{
        type: String,
        required: true,
    },
    imageId:[{
        type: ObjectId,
        ref: 'Image'
    }],
    featureId: [{
        type: ObjectId,
        ref: 'Feature'
    }],
    activityId: [{
        type: ObjectId,
        ref: 'Activity'
    }],
    
});

module.exports = mongoose.model('Item', itemSchema);