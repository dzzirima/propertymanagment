import  mongoose from "mongoose";
import { LEASE_STATUS } from "../util/types";

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



const Lease = mongoose.model("Lease", LeaseSchema);

export default Lease;
