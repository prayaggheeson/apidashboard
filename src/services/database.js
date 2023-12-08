const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://prayaggheeson:gheeson@cluster0.cdtqmza.mongodb.net/", {dbName:'dashboard-app', autoCreate:true});
        console.log('MongoDB connected...');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;