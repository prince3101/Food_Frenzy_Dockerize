const bill = require("../model/bill");

const GenerateBill = async (req, res) => {
  try {
    const body = req.body;
    const isBill = await bill.findOne({ table_no: body?.table_no, client_name: body?.client_name });

    if (isBill) {
      return res.status(400).send({ message: "Bill already exist !!" });
    }

    const bodyData = await bill.create(body);
    return res.status(200).send({ message: "user register successfully!!!", payload: bodyData });
  } catch (error) {
    console.log(error, "error++");
    return res.status(500).send({ message: "something went wrong !!" });
  }
};

const getBills = async (req, res) => {
  const bodyData = await bill.find({});
  return res.status(200).send({ message: "bill retrived successfully!!!", payload: bodyData });
};

const updateBill = async (req, res) => {
  const status = req.body?.status;
  const updateId = req.params?.id;
  const bodyData = await bill.updateOne({ _id: updateId }, { payment_status: status });
  return res.status(200).send({ message: "bill updated successfully!!!", payload: bodyData });
};

module.exports = {
  GenerateBill,
  getBills,
  updateBill
};
