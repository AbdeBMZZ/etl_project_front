import { FC } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { ITransformationRule } from "../lib/interfaces/ITransformationRule";

import {
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button,
} from "@mui/material";

type Props = {};

const TransformationRules: FC<Props> = (props: Props) => {
  const { status, error, data }: UseQueryResult<ITransformationRule[], Error> =
    useQuery<ITransformationRule[], Error>("api/transformation-rules");

  if (status === "loading") {
    return <CircularProgress />;
  }

  if (status === "error") {
    return <Typography>Error</Typography>;
  }

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
