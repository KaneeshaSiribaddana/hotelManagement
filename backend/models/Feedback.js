const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback;
