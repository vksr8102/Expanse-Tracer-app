import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    discription:{
        type:String,
        required:true
    },
    paymentType:{
        type:String,
        required:true,
        enum: ['cash', 'card']
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        default:"Unknown"
    },
    date:{
        type:Date,
       required:true
    }
},{
    timestamps: true
})