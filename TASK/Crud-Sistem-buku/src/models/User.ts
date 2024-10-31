import mongoose, { Schema, Document } from 'mongoose'

export interface Users extends Document {
    username: string;
    email: string;
    password: string;
}

const userSchema: Schema = new Schema({
    username: {type:String, require:true},
    email: {type:String, require: true, unique: true},
    password: {type:String, require: true}
}, {timestamps: true})

export const User = mongoose.model<Users>('User', userSchema);