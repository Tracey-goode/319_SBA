import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    // Reference the Author model
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    // Reference the Genre model
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    publishDate: {
        type: Date,
        default: Date.now
    }
});

// Index the title for efficient searching
bookSchema.index({ title: 1 });

const Book = mongoose.model('Book', bookSchema);
export default Book;