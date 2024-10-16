const todoModel = require("../models/todo");

const getTodos = async (req, res) => {
  try {
    const result = await todoModel.find(req.params);
    console.log(result);
    res.status(200).json({
      success: true,
      data: result,
      message: "Data fetched successfully",
    });
    // res.send(result)
  } catch (error) {
    res.status(500).json({
        success: false,
      data: "Internal server error",
      message: error.message,
      })
  }
};

module.exports = getTodos;