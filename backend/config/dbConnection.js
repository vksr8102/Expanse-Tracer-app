import mongoose from "mongoose";

export const dbConnection = async () => {
    mongoose.set('strictQuery', true);
    const uri = process.env.NODE_ENV === 'test' ? process.env.DB_TEST_URL : process.env.DB_URL;
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database is connected successfully ");
    } catch (error) {
        console.error("Error connecting to the Database  ");
        console.log(error);
    }
}

