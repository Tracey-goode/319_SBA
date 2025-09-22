import express from 'express';
import dotenv from 'dotenv';
import booksRoute from './routes/books.mjs';
import logger from './middleware/logger.mjs';
import connectDB from './connection/conn.mjs'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

connectDB()

//Middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static files
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

//routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/books', booksRoute);

//Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send ('!!Error!!');
});

app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});
