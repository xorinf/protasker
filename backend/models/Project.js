import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: [true, 'Please add a project name'],
        },
        description: {
            type: String,
        },
        color: {
            type: String,
            default: '#3b82f6', // Default blue
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
