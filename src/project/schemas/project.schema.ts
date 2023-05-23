import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    archieveAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });