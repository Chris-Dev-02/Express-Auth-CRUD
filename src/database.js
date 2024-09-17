import mongoose from "mongoose";
import { DB_HOST, DB_NAME } from "./config.js";

const MONGODB_URI = `mongodb://${DB_HOST}/${DB_NAME}`

export const connection = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/basic_auth_crud')
    .then(db => console.log('Database was connected successfully'))
    .catch(err => console.log(err))
}