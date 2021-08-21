import { Document } from 'mongoose';
import IUser from './user';

export default interface IAbout extends Document {
    title: string;
    author: IUser;
    content: string;
    resume: string;
    picture?: string;
}