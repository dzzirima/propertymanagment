import Payment from "../models/Payments.js";


export const createPayment = async (req, res) => {
  const {
    payeeID,
    propertyID,
    leaseID,

    paidAmount,
    datePaid,

    coverage,
    coverageTimeline,
    type,
    description,
    receiptURL
    
  } = req.body;

  //**TODO a way to check if the Payment  exists */


  try {
    const newPayment = await Payment.create({
      payeeID,
    propertyID,
    leaseID,

    paidAmount,
    datePaid,

    coverage,
    coverageTimeline,
    type,
    description,
    receiptURL
    });
    res
      .json({
        success: "true",
        message: "Payment created successfully",
        data: {
          Payment: newPayment,
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
/**  Update the Payment , eg current owner */
export const updatePayment = async (req, res) => {
  const {
    _id,
    payeeID,
    propertyID,
    leaseID,

    paidAmount,
    datePaid,

    coverage,
    coverageTimeline,
    type,
    description,
    receiptURL
    
  } = req.body;



  try {
    await Payment.findByIdAndUpdate(
      { _id },
      {
        $set: {
          payeeID,
          propertyID,
          leaseID,
      
          paidAmount,
          datePaid,
      
          coverage,
          coverageTimeline,
          type,
          description,
          receiptURL
        },
      }
    );
    return res.json({
      success: true,
      message: "Payment Updated SuccessFully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePayment = async (req, res) => {
  let { _id } = req.query;

  try {
    await Payment.findByIdAndDelete({ _id });
    return res.json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "failed to delete",
      error: error.message,
    });
  }
};

export const getPayment = async (req, res) => {
  let foundPayment;

  try {
    foundPayment = await Payment.findOne({
      _id: req.query,
    });

    if (!foundPayment) {
      return res.json({
        success: false,
        message: "No Payment found",
      });
    }

    return res.json({
      success: true,
      message: "Payment found",
      data: {
        Payment: foundPayment,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `${error.message}`,
    });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    let foundPayments= await Payment.find({});
    return res.json({
      success: true,
      message: "Properties found",
      data: {
        Payments: foundPayments
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `${error.message}`,
    });
  }
};

