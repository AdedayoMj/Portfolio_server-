import { Document } from 'mongoose';
import IUser from './user';

export default interface IArticle extends Document {
    writer: string;
    author: IUser;
    title: string;
    url?: string;
    otherInfo?: string;
    year?: string;
}