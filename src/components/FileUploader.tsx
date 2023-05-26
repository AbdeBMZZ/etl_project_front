import { FC, useContext, useEffect, useState } from "react";
import { Box, Typography, Button, makeStyles } from "@material-ui/core";
import { UseQueryResult, useMutation, useQuery } from "react-query";
import { fileHandler } from "../services/fileHandler";
import DataTable from "./DataTable";
import { AppContext } from "../context/AppContext";
import { ITransformationRule } from "../lib/interfaces/ITransformationRule";
import { ListItem, ListItemText } from "@mui/material";
import { applyRuleTable } from "../services/rulesHandler";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";

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

  const { data, setData, TransformationRulesData, setTransformationRulesData } =
    useContext(AppContext);

  const {
    status: rulesStatus,
    error: rulesError,
    data: rulesData,
  }: UseQueryResult<ITransformationRule[], Error> = useQuery<
    ITransformationRule[],
    Error
  >("api/transformation-rules");

  useEffect(() => {
    if (rulesStatus === "success") {
      setTransformationRulesData(rulesData);
    }
  }, [rulesStatus]);

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

  const applyRule = async (rule_id: any, csv_file_id: any) => {
    const data = await applyRuleTable(rule_id, csv_file_id);
    setData(data);
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLLIElement>,
    item: ITransformationRule
  ) => {
    console.log("drag start", item);
    event.dataTransfer.setData("draggedItem", JSON.stringify(item));
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const item = event.dataTransfer.getData("draggedItem");
    const droppedItem = JSON.parse(item);
    console.log(droppedItem);
    console.log("file id ", data.csv_file_ID);

    droppedItem.id && data.csv_file_ID
      ? applyRule(droppedItem.id, data.csv_file_ID)
      : applyRule(droppedItem.id, data.transformed_file_ID);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Box className={classes.container}>
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

      <Box style={{ width: "100%" }}>
        <Box
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Link to="/transformation-rules" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              component="span"
              className={classes.uploadButton}
              startIcon={<AddCircleOutlineIcon />}
              style={{
                marginBottom: "10px",
              }}
            >
              Add New Transformation Rule
            </Button>
          </Link>
          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridGap: "10px",
            }}
          >
            {TransformationRulesData &&
              TransformationRulesData.length > 0 &&
              TransformationRulesData.map((item: ITransformationRule) => (
                <ListItem
                  key={item.name}
                  button
                  style={{
                    marginBottom: "10px",
                    padding: "8px",
                    backgroundColor: "#fff",
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                    draggable
                    onDragStart={(e: React.DragEvent<HTMLLIElement>) => {
                      handleDragStart(e, item);
                    }}
                  >
                    <ListItemText primary={item.name} />
                    <DragIndicatorIcon />
                  </Box>
                </ListItem>
              ))}
          </Box>
        </Box>
      </Box>

      {data && data.headers.length > 0 && (
        <Box
          style={{
            width: "100%",
          }}
          droppable
          onDragOver={(e: React.DragEvent<HTMLLIElement>) => {
            handleDragOver(e);
          }}
          onDrop={(e: React.DragEvent<HTMLLIElement>) => {
            handleDrop(e);
          }}
        >
          <DataTable data={data} />
        </Box>
      )}
    </Box>
  );
};

export default FileUploader;
