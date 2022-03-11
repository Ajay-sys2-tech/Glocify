const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: true, unique: true},
    password: {type: String, required: true},
    gender: {type: String, required: true}
});

userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hash(password, bcrypt.genSalt(5), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
