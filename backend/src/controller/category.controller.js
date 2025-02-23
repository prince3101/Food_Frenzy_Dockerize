const bill = require("../model/bill");
const category = require("../model/category");
const user = require("../model/user");

const addCategory = async (req, res) => {
  try {
    const body = req.body;

    const bodyData = await category.create(body);
    return res.status(200).send({ message: "category added successfully!!!", payload: bodyData });
  } catch (error) {
    return res.status(400).send({ message: error?.message });
    console.log(error);
  }
};

const getCategory = async (req, res) => {
  const bodyData = await category.find({});
  return res.status(200).send({ message: "category retrived successfully!!!", payload: bodyData });
};

const getDashboardCount = async (req, res) => {
  const catCount = await category.find();
  const userCount = await user.find();
  const billCount = await bill.find();
  return res.status(200).send({ message: "category retrived successfully!!!", payload: {category: catCount?.length, user: userCount?.length, bill: billCount?.length} });
}

const getCategoryDetail = async(req, res) => {
  const  bodyData = await category.findOne({_id: req.params?.id})
  return res.status(200).send({ message: "category retrived successfully!!!", payload: bodyData });
}

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const bodyData = await category.deleteOne({ _id: id });
    return res
      .status(200)
      .send({ message: "inventory retrived successfully!!!", payload: bodyData });
  } catch (error) {
    return res.status(500).send({ message: "something went wrong!!!" });
  }
};

const updateCategory = async (req, res) => {
  const body = req.body;
  const id = req.params?.id;

  const bodyData = await category.findOneAndUpdate({ _id: id }, { $set: { ...body } });
  return res.status(201).send({ message: "category added successfully!!!", payload: bodyData });
};

module.exports = {
  addCategory,
  getCategory,
  deleteCategory,
  updateCategory,
  getCategoryDetail,
  getDashboardCount
};
