const inventory = require("../model/inventory");

const addInventory = async (req, res) => {
  try {
    const body = req.body;

    const bodyData = await inventory.create(body);
    return res.status(200).send({ message: "inventory added successfully!!!", payload: bodyData });
  } catch (error) {
    return res.status(400).send({ message: error?.message });
    console.log(error);
  }
};

const getInventory = async (req, res) => {
  try {
    const bodyData = await inventory.find({}).populate("category_id");
    return res
      .status(200)
      .send({ message: "inventory retrived successfully!!!", payload: bodyData });
  } catch (error) {
    return res.status(500).send({ message: "something went wrong!!!" });
  }
};

const getInventoryDetails = async(req, res) => {
  const  bodyData = await inventory.findOne({_id: req.params?.id})
  return res.status(200).send({ message: "category retrived successfully!!!", payload: bodyData });
}

const getInventoryByCat = async (req, res) => {
  try {
    const {id} = req.params
    const bodyData = await inventory.find({category_id: id});
    return res
      .status(200)
      .send({ message: "inventory retrived successfully!!!", payload: bodyData });
  } catch (error) {
    return res.status(500).send({ message: "something went wrong!!!" });
  }
};

const getInventoryByFood = async (req, res) => {
  try {
    const {name, item, price} = req.params
    const bodyData = await inventory.find({name, item, price});
    return res
      .status(200)
      .send({ message: "inventory retrived successfully!!!", payload: bodyData });
  } catch (error) {
    return res.status(500).send({ message: "something went wrong!!!" });
  }
};

const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const bodyData = await inventory.deleteOne({ _id: id });
    return res
      .status(200)
      .send({ message: "inventory Delete successfully!!!", payload: bodyData });
  } catch (error) {
    return res.status(500).send({ message: "something went wrong!!!" });
  }
};

const updateInventory = async (req, res) => {
  const body = req.body;
  const id = req.params?.id;

  const bodyData = await inventory.findOneAndUpdate({ _id: id }, { $set: { ...body } });
  return res.status(201).send({ message: "inventory added successfully!!!", payload: bodyData });
};


module.exports = {  
  addInventory,
  getInventory,
  getInventoryByCat,
  getInventoryByFood,
  deleteInventory,
  updateInventory,
  getInventoryDetails
};
  