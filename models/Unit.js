import mongoose from 'mongoose'


const UnintSchema = new mongoose.Schema({
    
    roomID:{
        type:String,
        required:[true,"Each Bed should be in room"]
    },

    currentOwnerID:{
        type:String,
     }, // Only if the room is shared

    unitName:String  // incase the owner wants  to rename the Unit Name

},{timestamps:true});

const Unint = mongoose.model("Unint",UnintSchema)

export default Unint