const todoModel = require("../models/todo");

const deleteTodo = async (req, res) => {
  try {
    const result = await todoModel.deleteOne({title:req.body.title});
    console.log(result);
    res.status(200).json({
      success: true,
      data: result,
      message: "Data deleted successfully",
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

module.exports = deleteTodo;
