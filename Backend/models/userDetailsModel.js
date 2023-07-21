const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userDetailsSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        required:true,
        unique:true,
        ref: "User"
    },
    height:{
        type:Number,
    },
    weight:{
        type:Number,
    },
    age:{
        type:Number,
    }
})

module.exports = mongoose.model("UserDetail",userDetailsSchema)