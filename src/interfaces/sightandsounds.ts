import { Document } from 'mongoose';
import IUser from './user';

export default interface ISightSound extends Document {
    title: string;
    author: IUser;
    picture: string;
}