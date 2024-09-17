import { Schema, model } from "mongoose";

const PostSchema = new Schema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    thumbnail_url:{
        type: String
    },
    published:{
        type: Boolean
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Post', PostSchema)