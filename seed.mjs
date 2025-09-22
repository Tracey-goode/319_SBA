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
