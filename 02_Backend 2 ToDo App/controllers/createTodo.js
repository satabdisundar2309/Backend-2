const todoModel = require("../models/todo");
// defining a routeHandler
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    // const data = new todoModel({title,description});
    // const result = await data.save();
    const response = await todoModel.create({ title, description }); //this line is equivalent to the above two loines
    console.log(response, "Inserted");

    // sending a json response with success flag
    res.status(200).json({
      success: true,
      data: response,
      message: "Entry created successfully",
    });
  } catch (error) { c
    console.log(error);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: error.message,
    });
  }
};

module.exports = createTodo;
