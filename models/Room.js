import mongoose from 'mongoose'


const RoomSchema = new mongoose.Schema({

    propertyID:{
        type:String,
        required:[true, "Each Room should belong to a property"]
    },
    roomName:String,
    shared:Boolean,
    currentStatus:String, // occipied or not
    
    currentOwnerId:String, // Only if its not shared
    numberOfUnits:{
        type:Number,
        default:1
    },
 
},{timestamps:true});






const Room = mongoose.model("Room",RoomSchema)

export default Room