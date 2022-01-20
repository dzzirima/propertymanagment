import  mongoose from "mongoose";

const LeaseSchema = new mongoose.Schema(
  {
    currentOwnerID:{
      type:String,
      required:[true,"All lease should be given to a person on its creation"]
    },
    type: String,
    description: String,
    numberOfTerms: Number,

    expiryDate:{
        type:String,
        required:[true,"Lease must must have expiry Date"]
    },
    active: Boolean,
  },
  { timestamps: true }
);

const Lease = mongoose.model("Lease", LeaseSchema);

export default Lease;
