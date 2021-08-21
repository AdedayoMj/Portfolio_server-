import { Document } from 'mongoose';
import IUser from './user';


export default interface IHonoursTemplate extends Document {
    year: string;
    author: IUser;
    title: string;
}