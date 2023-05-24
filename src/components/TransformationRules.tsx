import { FC, useContext } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { ITransformationRule } from "../lib/interfaces/ITransformationRule";

import {
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { AppContext } from "../context/AppContext";

type Props = {};

const TransformationRules: FC<Props> = (props: Props) => {
  const { setTransformationRulesData } = useContext(AppContext);

  const { status, error, data }: UseQueryResult<ITransformationRule[], Error> =
    useQuery<ITransformationRule[], Error>("api/transformation-rules");

  if (status === "loading") {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "error") {
    return <Typography>Error</Typography>;
  }

  setTransformationRulesData(data);

  return (
    <Box>
      <Typography variant="h6">Transformation Rules</Typography>
      <Box>
        {data &&
          data.map((item: ITransformationRule) => (
            <Box key={item.name}>
              <Typography>{item.name}</Typography>
            </Box>
          ))}

        <Box>
          <Typography variant="h6">Add New Transformation Rule</Typography>
          <form>
            <TextField label="Name" variant="outlined" margin="normal" />
            <TextField label="Operation" variant="outlined" margin="normal" />
            <TextField label="Column" variant="outlined" margin="normal" />
            <TextField label="Operator" variant="outlined" margin="normal" />
            <TextField label="Value" variant="outlined" margin="normal" />

            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default TransformationRules;
