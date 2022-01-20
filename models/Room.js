import mongoose from 'mongoose'


const RoomSchema = new mongoose.Schema({

    propertyId:{
        type:String,
        required:[true, "Each Room should belng to a property"]
    },

    shared:Boolean,
    numberOfUnits:Number,
    currentStatus:String,
    
    currentOwnerId:String, // Only if its not shared
    numberOfUnits:{
        type:Number,
        default:1
    },
 
},{timestamps:true});

const Room = mongoose.model("Room",RoomSchema)

export default Room