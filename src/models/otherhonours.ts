import mongoose, { Schema } from 'mongoose';
import IHonoursTemplate from '../interfaces/honourstemplate';

const OtherHounorSchema: Schema = new Schema(
    {
        year: { type: String, unique: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        title: { type: String, unique: true },
    
    },
)



export default mongoose.model<IHonoursTemplate>('OtherHonour', OtherHounorSchema);