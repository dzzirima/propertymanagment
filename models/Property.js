import mongoose from 'mongoose'


const PropertySchema = new mongoose.Schema({

    type: String,
    name: String,
    description: String,
    numberOfRooms: Number,
    phone: String,
    address: String, // { street1, street2, zipCode, city, state, country }
    location: String,
 
},{timestamps:true});

const Property = mongoose.model("Property",PropertySchema)

export default Property