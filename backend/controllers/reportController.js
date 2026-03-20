import Customer from "../models/Customer.js";
import { Parser } from "json2csv";

export const downloadReport = async (req, res) => {
  const data = await Customer.find();

  const parser = new Parser();
  const csv = parser.parse(data);

  res.header("Content-Type", "text/csv");
  res.attachment("report.csv");
  res.send(csv);
};
