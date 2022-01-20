import mongoose from 'mongoose'


const PaymentSchema = new mongoose.Schema({

    payeeID:String,
    propertyID:String,
    leaseID:String,

    paidAmount : Number,
    datePaid :String,

    coverage:Number,
    coverageTimeline:String, // DAYS /MONTHS
    type :String,
    description:String,
    receiptURL:String,

},{timestamps:true});

const Payment = mongoose.model("Payment",PaymentSchema)

export default Payment