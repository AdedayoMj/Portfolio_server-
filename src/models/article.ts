import mongoose, { Schema } from 'mongoose';
import IArticle from '../interfaces/article';

const ArticleSchema: Schema = new Schema(
    {
        writer: { type: String, unique: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        title: { type: String, unique: true },
        url: { type: String, unique: true },
        otherInfo: { type: String, unique: true },
        year: { type: String, unique: true },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IArticle>('Article', ArticleSchema);