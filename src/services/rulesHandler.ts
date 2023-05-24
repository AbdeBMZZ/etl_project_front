import axios from "axios";
import { ITransformationRule } from "../lib/interfaces/ITransformationRule";

export const applyRuleTable = async (rule_id: any, csv_file_id: any) => {
  const res = await axios.post("http://127.0.0.1:8000/api/transformed-data/", {
    rule_id: rule_id,
    csv_file_id: csv_file_id,
  });

  return res.data;
};

export const addRule = async (rule: ITransformationRule) => {
  const res = await axios.post(
    "http://127.0.0.1:8000/api/transformation-rules/",
    rule
  );

  return res.data;
};

export const removeRule = async (rule_id: any) => {
  const res = await axios.delete(
    `http://127.0.0.1:8000/api/transformation-rule/${rule_id}`
  );

  return res.data;
};
