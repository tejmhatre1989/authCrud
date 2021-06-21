import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: {
        type: String,
        default: null
    },
    middleName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    emailId: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    isActive: {
        type: String,
        enum: ['0', '1', '2'],
        default: '1'
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

userSchema.pre('save', function (next) {

    if (!this.isModified('password')) return next();

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
});

export default mongoose.model('User', userSchema);

