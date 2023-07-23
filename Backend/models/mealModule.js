const mongoose = require("mongoose")

const Schema = mongoose.Schema

const mealSchema = new Schema({
    tag:{
        type:String,
        required:true
    },
    macro_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Macros"
    },
    qty:{
        type:Number,
        required:true
    },
    created_by:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    date:{
        type:Date,
        required:true
    }
},{timestamps:{createdAt:true,updatedAt:false}})

module.exports = mongoose.model("meal",mealSchema)