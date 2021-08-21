import mongoose, { Schema } from 'mongoose';
import ICurrentProject from '../interfaces/currentproject';


const CurrentProjectSchema: Schema = new Schema(
    {
        attribute: { type: String, unique: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        title: { type: String, unique: true },
    
    },
)



export default mongoose.model<ICurrentProject>('CurrentProject', CurrentProjectSchema);