const todoModel = require("../models/todo");

const updateTodo = async (req, res) => {
  try {
    const result = await todoModel.updateOne({title:req.body.title},{$set:{description:req.body.description, updatedAt: Date.now()}});
    console.log(result);
    res.status(200).json({
      success: true,
      data: result,
      message: "Data updated successfully",
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

module.exports = updateTodo;
