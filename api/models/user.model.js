import mongoose from 'mongoose';
const userSchema=new mongoose.SchemaType({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
},{timestamp:true}
);
const User=mongoose.model('User',userSchema);
export default User;