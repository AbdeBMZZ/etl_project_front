import axios from "axios";

export const fileHandler = async (file: any) => {
  const formData = new FormData();
  formData.append("file_path", file);
  const res = await axios.post(
    "http://127.0.0.1:8000/api/csv-files/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};
