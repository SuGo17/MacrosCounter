const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userRoleSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        required:true,
        unique:true,
        ref:'User'
    },
    role:{
        type:String,
        default:"USER"
    }
})

module.exports = mongoose.model("UserRole",userRoleSchema)