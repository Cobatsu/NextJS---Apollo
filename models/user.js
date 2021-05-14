import mongoose from 'mongoose' 

const userSchema = new mongoose.Schema({


    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

}) 

export default typeof window === "undefined" &&   ( mongoose.models.user || mongoose.model('user', userSchema) )  ;
