import mongoose from 'mongoose'
mongoose.promise = global.promise;

const Schema = mongoose.Schema;


let TodoSchema = new Schema({
    title:{
        type: String,
        default: null
    },
    description:{
        type: String,
        default: null
    },
    isActive: {
        type: String,
        enum: ['0', '1'],
        default: '1'
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Todo', TodoSchema);