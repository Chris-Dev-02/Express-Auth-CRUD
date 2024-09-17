import { Schema, model } from "mongoose";

export const ROLES = ["admin", "moderator", "user"]

const roleSchema = new Schema({
    name:{
        type:String,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Role', roleSchema)