import Unit from "../models/Unit.js";

export const createUnit = async (req, res) => {
  const {
   roomID,
   currentOwnerID,
   unitName
   } = req.body;

  //**TODO check if room and owner have vacant */
  

  try {
    const newUnit = await Unit.create({
      roomID,
      currentOwnerID,
      unitName
    });
    res
      .json({
        success: "true",
        message: "Unit created successfully",
        data: {
          Unit: newUnit,
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
/**  Update the Unit , eg current owner */
export const updateUnit = async (req, res) => {
  const {
    _id,
    roomID,
    currentOwnerID,
    unitName
    
  } = req.body;



  try {
    await Unit.findByIdAndUpdate(
      { _id },
      {
        $set: {
          roomID,
          currentOwnerID,
          unitName
        },
      }
    );
    return res.json({
      success: true,
      message: "Unit Updated SuccessFully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUnit = async (req, res) => {
  let { _id } = req.query;

  try {
    await Unit.findByIdAndDelete({ _id });
    return res.json({
      success: true,
      message: "Unit deleted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "failed to delete",
      error: error.message,
    });
  }
};

export const getUnit = async (req, res) => {
  let foundUnit;

  try {
    foundUnit = await Unit.findOne({
      _id: req.query,
    });

    if (!foundUnit) {
      return res.json({
        success: false,
        message: "No Unit found",
      });
    }

    return res.json({
      success: true,
      message: "Unit found",
      data: {
        Unit: foundUnit,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `${error.message}`,
    });
  }
};

export const getAllUnits = async (req, res) => {
  try {
    let foundUnits= await Unit.find({});
    return res.json({
      success: true,
      message: "Properties found",
      data: {
        Units: foundUnits
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `${error.message}`,
    });
  }
};

