const express = require("express");
const foodModel = require("../models/food");
const app = express();

app.get("/foods", async (req, res) => {
  const foods = await foodModel.find({});

  try {
    res.send(foods);
  } catch (error) {
    return res.status(500).send({"message":"server error"});
  }
});


app.post("/foods", async (req, res) => {
  const food = new foodModel(req.body);

  try {
    await food.save();
    res.send(food);
  } catch (error) {
    res.status(400).send(error.message);

  }
});


app.patch("/foods/:id", async (request, response) => {
  try {
    await foodModel.findByIdAndUpdate(request.params.id, request.body);
    await foodModel.save();
    response.send(food);
    if (!food) response.status(404).send({"message":"Id is not found"});
    response.status(200).send();
  } catch (error) {
    response.status(400).send({"message":"Thats bad request"});
  }
});



app.delete("/foods/:id", async (request, response) => {
  try {
    const food = await foodModel.findByIdAndDelete(request.params.id);

    if (!food) response.status(404).send({"message":"Not found this id"});
    response.status(200).send();
  } catch (error) {
    response.status(400).send("This is bad request");
  }
});



module.exports = app;