import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        enum: ['Fantasy', 'Science Fiction', 'Dystopian', 'Romance', 'Classic', 'Thriller', 'Mystery']
    }
});

const Genre = mongoose.model('Genre', genreSchema);

export default Genre;