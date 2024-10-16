// step1: create new folder
// step2: open that in vs code
// step3: open the terminal and run "npm init -y"
// step4: now run "npm i express"
// step5: create a nwe file called "server.js"

// server instatiation
const express = require("express");
const app = express();

// using a middleware called body parser in order to parse the data inside the body of our requested url in express for "post" request (generally used for PUT or POST)
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // it means that, specifically parse JSON data and add it to the request.body

// activating the server on port 3000
app.listen(3000, () => {
  console.log("Server started at port number 3000");
});

// now in order to check that the above instantiated server i.e. "app" is working or not run "node server.js" this will show "Server started at port number 3000" in the terminal, now in order to see in the browser that out server is being instantiated we need to create a route like below

// Routes
app.get("/", (request, response) => {
  response.send("Hello, aapka swagat hai");
}); //in this case we can see the above written string on browser window as "Hello, aapka swagat hai"

app.post("/api/cars", (request, response) => {
  const { name, brand } = request.body;
  console.log(name);
  console.log(brand);
  response.send("Car submitted successfully");
}); //in this case we can't see the above written string on browser window as "Car submitted successfully". Now in order to verify that the poist request is working we will use postman.

//Linking expressJS with mongoDB using mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Cars', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {console.log("Connection successful");})
  .catch((error) => {console.log(error);})

// here the above code is the syntax, and myDatabase is the name of the database. If there will not be pre-existing database with such name then it will create a new database with such name or else it bwill create a connection with given database name if a database with such name exists already.

//useNewUrlParser: true,
//useUnifiedTopology: true
// the above two lines are the mandatory configurations and you need not to know about them in detail(In general there are 4 configurations like the above two but since we are running this in our local computer,we can jujst write these two only). Here 'mongodb://localhost:27017/Cars' shows error and unable to connect, but 'mongodb://127.0.0.1/Cars' works.
