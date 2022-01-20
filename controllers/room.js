import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
  const {
    propertyID,
    roomName,
    shared,
    numberOfUnits,
    currentStatus,
    currentOwnerID,
  } = req.body;

  //**TODO a way to check if the Room  exists */


  try {
    const newRoom = await Room.create({
      propertyID,
      shared,
      roomName,
      numberOfUnits,
      currentStatus,
      currentOwnerID,
      numberOfUnits,
    });
    res
      .json({
        success: "true",
        message: "Room created successfully",
        data: {
          Room: newRoom,
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
/**  Update the room , eg current owner */
export const updateRoom = async (req, res) => {
  const {
    _id,
    shared,
    roomName,
    numberOfUnits,
    currentStatus,
    currentOwnerID,
    
  } = req.body;



  try {
    await Room.findByIdAndUpdate(
      { _id },
      {
        $set: {
            shared,
            roomName,
            numberOfUnits,
            currentStatus,
            currentOwnerID,
            numberOfUnits,
          
        },
      }
    );
    return res.json({
      success: true,
      message: "Room Updated SuccessFully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteRoom = async (req, res) => {
  let { _id } = req.query;

  try {
    await Room.findByIdAndDelete({ _id });
    return res.json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "failed to delete",
      error: error.message,
    });
  }
};

export const getRoom = async (req, res) => {
  let foundRoom;

  try {
    foundRoom = await Room.findOne({
      _id: req.query,
    });

    if (!foundRoom) {
      return res.json({
        success: false,
        message: "No Room found",
      });
    }

    return res.json({
      success: true,
      message: "Room found",
      data: {
        Room: foundRoom,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `${error.message}`,
    });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    let foundRooms= await Room.find({});
    return res.json({
      success: true,
      message: "Properties found",
      data: {
        Rooms: foundRooms
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `${error.message}`,
    });
  }
};
