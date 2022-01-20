import Expense from "../models/Expenses.js";


export const createExpense = async (req, res) => {
  const {
    paidTo,
    paidAmount,
    datePaid,
    propertyPaid,
    type,
    coverage,
    coverageTimeline,
    description,
    receiptURL

  } = req.body;

  //**TODO a way to check if the Expense  exists */


  try {
    const newExpense = await Expense.create({
      paidTo,
      paidAmount,
      datePaid,
      propertyPaid,
      type,
      coverage,
      coverageTimeline,
      description,
      receiptURL
    });
    res
      .json({
        success: "true",
        message: "Expense created successfully",
        data: {
          expense: newExpense,
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
/**  Update the Expense , eg current owner */
export const updateExpense = async (req, res) => {
  const {
    _id,
    paidTo,
    paidAmount,
    datePaid,
    propertyPaid,
    type,
    coverage,
    coverageTimeline,
    description,
    receiptURL
    
  } = req.body;



  try {
    await Expense.findByIdAndUpdate(
      { _id },
      {
        $set: {
          paidTo,
    paidAmount,
    datePaid,
    propertyPaid,
    type,
    coverage,
    coverageTimeline,
    description,
    receiptURL
        },
      }
    );
    return res.json({
      success: true,
      message: "Expense Updated SuccessFully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteExpense = async (req, res) => {
  let { _id } = req.query;

  try {
    await Expense.findByIdAndDelete({ _id });
    return res.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "failed to delete",
      error: error.message,
    });
  }
};

export const getExpense = async (req, res) => {
  let foundExpense;

  try {
    foundExpense = await Expense.findOne({
      _id: req.query,
    });

    if (!foundExpense) {
      return res.json({
        success: false,
        message: "No Expense found",
      });
    }

    return res.json({
      success: true,
      message: "Expense found",
      data: {
        Expense: foundExpense,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `${error.message}`,
    });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    let foundExpenses= await Expense.find({});
    return res.json({
      success: true,
      message: "Properties found",
      data: {
        Expenses: foundExpenses
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `${error.message}`,
    });
  }
};

