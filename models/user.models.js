const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    userName :{
        type: String,
        required: 'User name empty'
    },
    email: {
        type: String,
        required: 'Email empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password empty',
        minlength: [4,'Password must be atleast 4 charater long']
    },
    telephoneNo: {
        type: String,
        required: 'Telephone no empty',
        unique: true
    },
    saltSecret: String
});

// Events
userSchema.pre('save',function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt,(err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

// Custom validation for email
userSchema.path('email').validate((val)=>{
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
},'Invalid E-mail.');

mongoose.model('User',userSchema);