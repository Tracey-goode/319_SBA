import mongoose from 'mongoose';
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    bio: String,
    birthYear: {
        type: Number,
        min: 0,
        max: new Date().getFullYear()
    }
});

const Author = mongoose.model('Author', authorSchema);

export default Author;
