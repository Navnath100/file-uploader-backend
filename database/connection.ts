import mongoose, { ConnectOptions } from 'mongoose'
async function createConnection(params: any, next: any) {
    try {
        const DB_URL: any = process.env.DB_URL
        // mongodb connection
        mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)
            .then(result => console.log("MongoDB is connected"))
            .catch(err => console.log(err))
    } catch (error) {
        console.log("Error in database/connection", error);
    }
}

module.exports = createConnection