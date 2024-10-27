import mongoose from "mongoose";

import bcrypt from "bcrypt"
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        enum:["male","female"],
    },
   
},{
    timestamps: true
})

UserSchema.pre('save',async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

UserSchema.methods.isPasswordMatched = async function(password){
    const user = this;
    const isMatch = await bcrypt.compare(password,user.password);
    return isMatch;
}




const User = new mongoose.model("User",UserSchema);

export default User;