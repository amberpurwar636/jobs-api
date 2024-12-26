const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'please provide the username'],
        minlength:3,
        maxlength:40,
    },
    email:{
        type:String,
        required:[true,'please provide the email'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please provide valid email'
        ],
    },
    password:{
        type:String,
        required:[true,'please provide the password'],
        minlength:3,
    }
})

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.username },
        'jwtsecret', // Consider moving 'jwtsecret' to an environment variable for better security.
        { expiresIn: '30d' }
    );
};


module.exports=mongoose.model('User',UserSchema);

