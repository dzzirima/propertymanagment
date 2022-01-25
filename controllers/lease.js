import Lease from "../models/Lease.js";
import Room from "../models/Room.js";
import User from "../models/User.js";
import { RoomStatus } from "../util/types.js";

export const createLease = async (req, res) => {
  const {
    currentOwnerID,
    roomNumber,
    bedNumber,
    description,
    numberOfTerms,
    type,
    balance,
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
    //{ $or:[ {'_id':objId}, {'name':param}, {'nickname':param} ]}

    let currentOccupant_room = await Lease.find({
      roomNumber: roomNumber,
    });
    let roomRequested = await Room.findOne({ roomNumber: roomNumber });

    if (currentOccupant_room.length === 0) {
      /**Case 1 . The Room is not yet claimed*/
      const newLease = await Lease.create({
        currentOwnerID,
        roomNumber,
        bedNumber,
        type,
        balance,
        description,
        numberOfTerms,
        expiryDate,
        active,
      });
      /**Update Current room status */
      roomRequested.currentOwnerID = currentOwnerID,
      roomRequested.currentStatus = RoomStatus.OCCUPIED;
      await roomRequested.save();
      res
        .json({
          success: "true",
          message: "Lease created successfully",
          data: {
            lease: newLease,
          },
        })
        .status(200);
    } else {
      /**case 2 shared room
       * 2.1 check if the room is in shared state
       * 2.2 checkif the bed requested is >= maximumUnits
       * 2.3  check if that combination exi
       */

      let roomSharingStatus = roomRequested.shared;
      let maximumNumberOfUnitsInRoom = roomRequested.numberOfUnits;

      if (
        roomSharingStatus &&
        Number(bedNumber) <= maximumNumberOfUnitsInRoom
      ) {
        let combinationOccupant = await Lease.findOne({
          roomNumber: roomNumber,
          bedNumber: bedNumber,
        });

        if (combinationOccupant) {
          return res.status(403).json({
            success: false,
            message: "Something went wrong",
            data: {
              currentOccupant: combinationOccupant,
            },
          });
        }

        const newLease = await Lease.create({
          currentOwnerID,
          roomNumber,
          bedNumber,
          type,
          balance,
          description,
          numberOfTerms,
          expiryDate,
          active,
        });

        /**Update Room Status */
        (roomRequested.currentOwnerID = currentOwnerID),
          (roomRequested.currentStatus = RoomStatus.OCCUPIED);
        await roomRequested.save();

        res
          .json({
            success: true,
            message: "Lease created successfully",
            data: {
              lease: newLease,
            },
          })
          .status(200);
      } else {
        if (bedNumber) {
          return res.status(403).json({
            success: false,
            message: "Something went wrong",
            possibleErrors: {
              possible:
                "Room not in shared state ,bed Number requested above room carring capacity || room Already taken ",
            },
          });
        } else if (currentOccupant_room.length != 0) {
          return res.status(403).json({
            success: false,
            message: "Found Current room Occupant",
            currentRoomOCupant: currentOccupant_room,
          });
        }
      }
    }

    // if (!foundCurrentRoomOccupant.length) {
    //   /**check if a room is a shared
    //    * if so check if the Bed is not yet occupied
    //    * This check only applies when the room is shared
    //    */
    //   if (bedNumber) {
    //     let roomRequested = await Room.findOne({ roomNumber: roomNumber });

    //     if (!roomRequested) {
    //       return res.status(401).json({
    //         success: false,
    //         message:
    //           "Room requested  Not found try create room before asigning to user",
    //       });
    //     } else {
    //       // find the room combination ie roomNumber and bed Number
    //       let maximumNumberOfUnitsInRoom = roomRequested.numberOfUnits;

    //       let currentBedOccupant = await Lease.findOne({
    //         bedNumber: bedNumber,
    //       });

    //       if (currentBedOccupant) {
    //         return res.status(409).json({
    //           success: false,
    //           message: "Bed Number already Occupied By Someone ",
    //           data: {
    //             lease: currentBedOccupant,
    //           },
    //         });
    //       }

    //       //**try assigning the bed to someone */
    //       if (roomRequested.shared) {
    //         if (Number(bedNumber) > maximumNumberOfUnitsInRoom) {
    //           return res.status(403).json({
    //             success: false,
    //             message: "Bed Number  above maximum capacity of the room",
    //             data: {
    //               room: roomRequested,
    //               bedNumberRequested: bedNumber,
    //               maximumRoomBeds: roomRequested.numberOfUnits,
    //             },
    //           });
    //         }
    //       } else {
    //         return res.status(401).json({
    //           success: false,
    //           message: "Room is not sharable",
    //           data: {
    //             error: "Not Sharable",
    //             room: roomRequested,
    //             bedNumberRequested: bedNumber,
    //             maximumRoomBeds: roomRequested.numberOfUnits,
    //           },
    //         });
    //       }
    //     }
    //   } else {
    //     return res.status(409).json({
    //       success: false,
    //       message: "That room is already occupied",
    //       data: {
    //         lease: foundCurrentRoomOccupant,
    //       },
    //     });
    //   }
    // }

    // const newLease = await Lease.create({
    //   currentOwnerID,
    //   roomNumber,
    //   bedNumber,
    //   type,
    //   balance,
    //   description,
    //   numberOfTerms,
    //   expiryDate,
    //   active,
    // });
    // res
    //   .json({
    //     success: "true",
    //     message: "Lease created successfully",
    //     data: {
    //       lease: newLease,
    //     },
    //   })
    //   .status(200);
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
