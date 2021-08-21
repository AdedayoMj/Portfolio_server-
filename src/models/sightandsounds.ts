import mongoose, { Schema } from 'mongoose';
import ISightSound from '../interfaces/sightandsounds';

const SightSoundSchema: Schema = new Schema(
    {
        title: { type: String, unique: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        picture: { type: String, unique: true },
    },
);

export default mongoose.model<ISightSound>('SightSound', SightSoundSchema);