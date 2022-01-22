import mongoose from 'mongoose'


const PaymentSchema = new mongoose.Schema({

    payeeID:String,
    propertyID:String,
    leaseID:String,

    paidAmount : Number,
    datePaid :Date,

    
    type :String, //USD/RTGS

    description:String,
    receiptURL:String,
    reference:{
        type:String,
        required:[true,"Please each Payment should have a reciept"],
        unique:[true, "Each Payment can Only be entered Once"]
    }

},{timestamps:true});

const Payment = mongoose.model("Payment",PaymentSchema)

export default Payment