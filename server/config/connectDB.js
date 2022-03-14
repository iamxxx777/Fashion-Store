require('dotenv').config();
const mongoose = require('mongoose');

var db = process.env.MONGO_URI;

const connectDB = async () => {
        try {
             await mongoose.connect(db);

             console.log('Mongoose is connected...');
        } catch (error) {
                console.error(error);
                process.exit(1);
        }
}

module.exports = connectDB;
