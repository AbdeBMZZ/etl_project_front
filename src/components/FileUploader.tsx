import { FC, useState } from "react";
import { Box, Typography, Button, makeStyles } from "@material-ui/core";
import { useMutation } from "react-query";
import { fileHandler } from "../services/fileHandler";
import DataTable from "./DataTable";
import { ITableData } from "../lib/interfaces/ITableData";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    backgroundColor: "#f5f5f5",
    borderRadius: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
  },
  dropArea: {
    width: "100%",
    height: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  fileName: {
    fontWeight: "bold",
    marginTop: theme.spacing(1),
  },
  uploadButton: {
    marginTop: theme.spacing(2),
  },
  fileInput: {
    display: "none",
  },
}));

type Props = {};

const FileUploader: FC<Props> = (props) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const [data, setData] = useState<ITableData>({
    headers: [],
    rows: [],
    message: "",
  });

  const classes = useStyles();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };

  const uploadFile = useMutation({
    mutationFn: fileHandler,
    onSuccess: (data) => {
      setData(data);
    },
  });

  return (
    <Box className={classes.container}>
      <Typography variant="h6" className={classes.title}>
        File Uploader
      </Typography>
      <div className={classes.dropArea}>
        {selectedFile ? (
          <>
            <Typography variant="body1" className={classes.fileName}>
              {selectedFile.name}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (selectedFile) {
                  uploadFile.mutate(selectedFile);
                }
              }}
              className={classes.uploadButton}
            >
              Upload
            </Button>
          </>
        ) : (
          <Typography variant="body1">Drag and drop a file here</Typography>
        )}
      </div>
      <input
        type="file"
        accept=".csv"
        id="file-input"
        className={classes.fileInput}
        onChange={handleFileUpload}
      />
      <label htmlFor="file-input">
        <Button
          variant="contained"
          color="primary"
          component="span"
          className={classes.uploadButton}
        >
          Browse
        </Button>
      </label>

      {data.headers.length > 0 && <DataTable data={data} />}
    </Box>
  );
};

export default FileUploader;
