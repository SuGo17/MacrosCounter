const mongoose = require("mongoose")

const Schema = mongoose.Schema

const macrosSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    qty:{
        type:Number,
        required:true
    },
    protein:{
        type:Number,
        default:0
    },
    carbohydrates:{
        type:Number,
        default:0
    },
    fat:{
        type:Number,
        default:0
    },
    fiber:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model("Macros",macrosSchema)