const {Schema, model} = require('mongoose'); //Types or model? 
//destructure object

const userSchema= new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ //regex for validating email!

        },
        thoughts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought'
        }],

        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]

    });
// virtual for getting number of friends
    userSchema.virtual('friendCount').get(function () {
        return this.friends.length;
    });
    const User= mongoose.model('User', userSchema);
    module.exports= User;
