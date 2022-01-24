
 

    import mongoose from 'mongoose'


const ExpenseSchema = new mongoose.Schema({

    paidTo:String,
    paidAmount:Number,
    datePaid:String,
    propertyPaid:String,

    type:String, // Currency Used
    coverage:Number, // 3
    coverageTimeline:String,// Months

    description:String,
    receiptURL:String
   
},{timestamps:true});

const Expense = mongoose.model("Expense",ExpenseSchema)

export default Expense