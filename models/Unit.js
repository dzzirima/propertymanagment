import mongoose from 'mongoose'


const UnintSchema = new mongoose.Schema({
    
    RoomId,
    currentOwnerId:String, // Only if the room is shared
},{timestamps:true});

const Unint = mongoose.model("Unint",UnintSchema)

export default Unint