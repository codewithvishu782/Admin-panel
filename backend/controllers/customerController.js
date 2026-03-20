import Customer from "../models/Customer.js";

export const getCustomers = async (req, res) => {
  const data = await Customer.find();
  res.json(data);
};

export const addCustomer = async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.json(customer);
};
