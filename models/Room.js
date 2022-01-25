import mongoose from 'mongoose'
import { RoomStatus } from '../util/types.js';


const RoomSchema = new mongoose.Schema({

    propertyID:{
        type:String,
        required:[true, "Each Room should belong to a property"]
    },
    roomName:String,
    shared:{
        type:Boolean,
        default:false,
    },
    roomNumber:{
        type:Number,
        unique:[true,"All rooms should have a unique Number"]
    },
    currentStatus:{
        type:String,
        default:RoomStatus.EMPTY,
    } ,// occipied or not
    
    currentOwnerID:{
        type:String,
        default:""
    }, // Only if its not shared
    numberOfUnits:{
        type:Number,
        default:1
    },
 
},{timestamps:true});

RoomSchema.methods.checkSharingStatus = async function (roomNumber){
    return this.shared
}

const Room = mongoose.model("Room",RoomSchema)

export default Room