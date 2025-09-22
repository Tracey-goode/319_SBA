import { mongoose } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.atlasURI || '';

async function connectDB() {
    try {
        await mongoose.connect(process.env.atlasURI);
        console.log(`Connected to MongoDB...`)
    } catch (err) {
        console.error(err.message);
    }
}

export default connectDB;