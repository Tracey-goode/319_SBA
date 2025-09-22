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
        const books = [
            { title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', publishDate: new Date('1937-09-21') },
            { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', genre: 'Fantasy', publishDate: new Date('1954-07-29') },
            { title: '1984', author: 'George Orwell', genre: 'Dystopian', publishDate: new Date('1949-06-08') },
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', publishDate: new Date('1925-04-10') },
            { title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', publishDate: new Date('1813-01-28') },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', publishDate: new Date('1960-07-11') }
        ];

        // Insert Genres and Authors first to get their IDs
        const insertedGenres = await Genre.insertMany(genres);
        console.log('Genres seeded!');

        const insertedAuthors = await Author.insertMany(authors);
        console.log('Authors seeded!');

        
        const seededBooks = books.map(book => {
            const author = insertedAuthors.find(a => a.name === book.author);
            const genre = insertedGenres.find(g => g.name === book.genre);
            return {
                title: book.title,
                author: author._id,
                genre: genre._id,
                publishDate: book.publishDate
            };
        });
        await Book.insertMany(seededBooks);
        console.log('Books seeded!');

    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        // Disconnect from the database
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
};

seedData();
        

