import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please add a task title'],
        },
        description: {
            type: String,
        },
        priority: {
            type: String, // 'low', 'medium', 'high'
            default: 'medium',
        },
        completed: {
            type: Boolean,
            default: false,
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
