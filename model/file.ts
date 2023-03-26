import mongoose from 'mongoose'
const Schema = mongoose.Schema

const FileSchema = new Schema({
    email: { type: String, require: true },
    key: { type: String, require: true },
    type: { type: String, require: true },
    fileName: { type: String, require: true },
},
    {
        timestamps: true
    })


const File = mongoose.model('file', FileSchema)

export default File