import  mongoose from "mongoose";
import { LEASE_STATUS } from "../util/types.js";

const LeaseSchema = new mongoose.Schema(
  {
    currentOwnerID:{
      type:String,
      required:[true,"All lease should be given to a person on its creation"]
    },
    roomNumber:Number,
    bedNumber:Number,
    type: String,
    description: String,
    numberOfTerms: Number,

    expiryDate:{
        type:String,
        required:[true,"Lease must must have expiry Date"]
    },
    active: Boolean,
    balance:{
      type:Number,
      required:[true,"Specifie the amount to be paid by tenants"]
    },
    paymentStatus:{
      type:String,
      default:LEASE_STATUS.CREATED
    }
  },
  { timestamps: true }
);



LeaseSchema.pre("save", async function(next){
  //check if the balance changed
  if(!this.isModified('balance')){
    console.log("Balance was not mofied")
    return next()
  }
  //change the status of the lease ie
  let currentLeaseBalance = Number(this.balance)

  //these conditions are based on  nust fees payment system
  
  if(currentLeaseBalance == 0){
    this.paymentStatus = LEASE_STATUS.PAID;
  }else if(currentLeaseBalance < 0){
    this.paymentStatus =LEASE_STATUS.OVER_PAID
  }else if(currentLeaseBalance > 0){
    this.paymentStatus = LEASE_STATUS.OUTSTANDING
  }
  next()

})



const Lease = mongoose.model("Lease", LeaseSchema);

export default Lease;
