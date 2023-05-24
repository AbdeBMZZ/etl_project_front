import axios from "axios";

export const applyRuleTable = async (rule_id: any, csv_file_id: any) => {
  const res = await axios.post("http://127.0.0.1:8000/api/transformed-data/", {
    rule_id: rule_id,
    csv_file_id: csv_file_id,
  });

  return res.data;
};
