import express from 'express';
import Book from '../models/book.mjs';
import Author from '../models/author.mjs';
import Genre from '../models/genre.mjs';

const router = express.Router();

// GET all books with filters
router.get('/', async (req, res, next) => {
    try {
        const { genre, author } = req.query;
        let query = {};
        if (genre) {
            const genreDoc = await Genre.findOne({ name: genre });
            if (genreDoc) {
                query.genre = genreDoc._id;
            }
        }
        if (author) {
            const authorDoc = await Author.findOne({ name: author });
            if (authorDoc) {
                query.author = authorDoc._id;
            }
        }

        
        const books = await Book.find(query).populate('author').populate('genre');
        res.render('books', { books });
    } catch (err) {
        next(err);
    }
});

// GET form to add a new book
router.get('/new', async (req, res, next) => {
    try {
        const authors = await Author.find({});
        const genres = await Genre.find({});
        res.render('add-book', { authors, genres });
    } catch (err) {
        next(err);
    }
});

// GET single book by ID
router.get('/:id', async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id).populate('author').populate('genre');
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.json(book);
    } catch (err) {
        next(err);
    }
});

// POST a new book
router.post('/', async (req, res, next) => {
    try {
        
        const newBook = new Book(req.body);
        await newBook.save();
        res.redirect('/books');
    } catch (err) {
        next(err);
    }
});

// PATCH/PUT to update a book
router.patch('/:id', async (req, res, next) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }
        res.json(updatedBook);
    } catch (err) {
        next(err);
    }
});

// DELETE a book
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).send('Book not found');
        }
        res.status(204).send(); // 204 No Content for successful deletion
    } catch (err) {
        next(err);
    }
});

export default router;