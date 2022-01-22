import Lease from "../models/Lease.js";
import Payment from "../models/Payments.js";
import Property from "../models/Property.js";
import User from "../models/User.js";

export const createPayment = async (req, res) => {
  const {
    payeeID,
    propertyID,
    leaseID,

    paidAmount,
    datePaid,

    reference,
    type,
    description,
    receiptURL,
  } = req.body;
  try {
    //**TODO a way to check if the Payment  exists */
    let foundPayment = await Payment.findOne({ reference: reference });

    if (foundPayment) {
      return res.status(302).json({
        success: false,
        message: "One payment with that reference/receipt Number already exits",
      });
    }

    /**checking if the one who is paying is in the system */
    let foundPayee = await User.findById(payeeID);
    if (!foundPayee) {
      return res.status(302).json({
        success: true,
        message: "Id of specified payeee not found please provide correct ID",
        dataReceived: {
          payeeID: payeeID,
        },
      });
    }

    /**Accept money only if someone has a lease which is not yet paid
     *
     *or if they have been assigned a renting unit
     */
    let foundLease = await Lease.findById(leaseID);
    if (!foundLease) {
      return res.status(302).json({
        success: false,
        message:
          "One is allowed to pay once they have been given a lease or if they are owning",
      });
    }
    /** TO property Id  Is needed if we doing multiple
     * TODO do proper checking if the building exists
     * In this case it will throw an error hence failing
     */
    let foundProperty = await Property.findById(propertyID);

    const newPayment = await Payment.create({
      payeeID,
      propertyID,
      leaseID,

      paidAmount,
      datePaid,

      type,
      description,
      receiptURL,
      reference,
    });

    /**Now go ahead and reduce the lease balance  */
   
    let newLeaseBalance = foundLease.balance - Number(paidAmount).toFixed(2);
    foundLease.balance = newLeaseBalance.toFixed(2);
    await foundLease.save();

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
    receiptURL,
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
          receiptURL,
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
    let foundPayments = await Payment.find({});
    return res.json({
      success: true,
      message: "Properties found",
      data: {
        Payments: foundPayments,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `${error.message}`,
    });
  }
};
