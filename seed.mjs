import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/book.mjs';
import Author from './models/author.mjs';
import Genre from './models/genre.mjs';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding!');

        // Clear existing data
        await Promise.all([
            Book.deleteMany({}),
            Author.deleteMany({}),
            Genre.deleteMany({})
        ]);
        console.log('Existing data cleared!');

        const genres = [
            { name: 'Fantasy' },
            { name: 'Science Fiction' },
            { name: 'Dystopian' },
            { name: 'Classic' },
            { name: 'Romance' }
        ];

        const authors = [
            { name: 'J.R.R. Tolkien', bio: 'An English writer and philologist.', birthYear: 1892 },
            { name: 'George Orwell', bio: 'An English novelist, essayist, and journalist.', birthYear: 1903 },
            { name: 'Jane Austen', bio: 'An English novelist known for her romantic fiction.', birthYear: 1775 },
            { name: 'J.D. Salinger', bio: 'An American writer known for his novel "The Catcher in the Rye".', birthYear: 1919 },
            { name: 'F. Scott Fitzgerald', bio: 'An American novelist and short story writer.', birthYear: 1896 }
        ];

