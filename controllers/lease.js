import Lease from "../models/Lease.js";
import User from "../models/User.js";

export const createLease = async (req, res) => {
  const {
    currentOwnerID,
    roomNumber,
    description,
    numberOfTerms,
    type,
    expiryDate,
    
    active,
  } = req.body;

  //**TODO a way to check if the Lease  exists */

  try {

    /**1.check if the user exists in our database */
    /**A room must have a maximum number of beds */
    let foundUser = await User.findById(currentOwnerID);

    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "User with ID not found",
      });
    }

    /**2.check if the room requested has not yet occupied */
    let foundCurrentOccupant = await Lease.findOne({roomNumber :roomNumber , bedNumber:bedNumber})

    if(foundCurrentOccupant){
      return res.status(409).json({
        success:false,
        message:"That room is already occupied"
      })
    }
    /**check if a room is a shared
     * if so check if the Bed is not yet occupied
     */






    const newLease = await Lease.create({
      currentOwnerID,
      roomNumber,
      type,
      description,
      numberOfTerms,
      expiryDate,
      active,
    });
    res
      .json({
        success: "true",
        message: "Lease created successfully",
        data: {
          lease: newLease,
        },
      })
      .status(200);
  } catch (error) {
    console.log(error);
    res
      .json({
        success: "false",
        message: error.message,
      })
      .status(201);
    return;
  }
};
/**  Update the Lease , eg current owner */
export const updateLease = async (req, res) => {
  const {
    _id,
    currentOwnerID,
    type,
    description,
    numberOfTerms,
    expiryDate,
    active,
  } = req.body;

  try {
    await Lease.findByIdAndUpdate(
      { _id },
      {
        $set: {
          currentOwnerID,
          type,
          description,
          numberOfTerms,
          expiryDate,
          active,
        },
      }
    );
    return res.json({
      success: true,
      message: "Lease Updated SuccessFully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteLease = async (req, res) => {
  let { _id } = req.query;

  try {
    await Lease.findByIdAndDelete({ _id });
    return res.json({
      success: true,
      message: "Lease deleted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "failed to delete",
      error: error.message,
    });
  }
};

export const getLease = async (req, res) => {
  let foundLease;

  try {
    foundLease = await Lease.findOne({
      _id: req.query,
    });

    if (!foundLease) {
      return res.json({
        success: false,
        message: "No Lease found",
      });
    }

    return res.json({
      success: true,
      message: "Lease found",
      data: {
        Lease: foundLease,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `${error.message}`,
    });
  }
};

export const getAllLeases = async (req, res) => {
  try {
    let foundLeases = await Lease.find({});
    return res.json({
      success: true,
      message: "Properties found",
      data: {
        Leases: foundLeases,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `${error.message}`,
    });
  }
};
