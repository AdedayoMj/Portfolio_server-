import mongoose, { Schema } from 'mongoose';
import IAbout from '../interfaces/about';

const AboutSchema: Schema = new Schema(
    {
        title: { type: String, unique: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, unique: true },
        resume: { type: String, unique: true },
        picture: { type: Object, unique: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IAbout>('About', AboutSchema);