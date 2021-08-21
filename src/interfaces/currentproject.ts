import { Document } from 'mongoose';
import IUser from './user';

export default interface ICurrentProject extends Document {
    attribute: string;
    author: IUser;
    title: string;
}