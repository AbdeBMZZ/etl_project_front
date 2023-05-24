import { FC, useContext, useState } from "react";
import { UseQueryResult, useMutation, useQuery } from "react-query";
import { ITransformationRule } from "../lib/interfaces/ITransformationRule";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button,
  FormControl,
  Divider,
} from "@mui/material";
import { AppContext } from "../context/AppContext";
import DataTable from "./DataTable";
import { addRule } from "../services/rulesHandler";

type Props = {};

type Inputs = {
  name: string;
  operation: string;
  column: string;
  operator: string;
  value: string;
};

const TransformationRules: FC<Props> = (props: Props) => {
  const { setTransformationRulesData } = useContext(AppContext);

  const handleAddRule = useMutation({
    mutationFn: addRule,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

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

  let headers = ["ID", "Name", "Operation", "Column", "Operator", "Value"];

  let dataTable = {
    message: "Transformation Rules",
    headers: headers,
    rows: data && data.map((item: ITransformationRule) => Object.values(item)),
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleAddRule.mutate(data);
  };

  return (
    <Box
      style={{
        width: "100%",
      }}
    >
      <Typography
        variant="h6"
        style={{
          textAlign: "center",
        }}
      >
        Transformation Rules
      </Typography>

      <Divider light />

      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <p
            style={{
              color: "#3f51b5",
            }}
          >
            Add New Transformation Rule
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              label="Name"
              {...register("name", { required: "This field is required" })}
              variant="outlined"
              margin="normal"
              error={!!errors.name}
            />
            {errors.name && (
              <FormHelperText error>{errors.name.message}</FormHelperText>
            )}

            <TextField
              label="Operation"
              {...register("operation", { required: "This field is required" })}
              variant="outlined"
              margin="normal"
              error={!!errors.operation}
            />
            {errors.operation && (
              <FormHelperText error>{errors.operation.message}</FormHelperText>
            )}

            <TextField
              label="Column"
              {...register("column", { required: "This field is required" })}
              variant="outlined"
              margin="normal"
              error={!!errors.column}
            />
            {errors.column && (
              <FormHelperText error>{errors.column.message}</FormHelperText>
            )}

            <TextField
              label="Operator"
              {...register("operator", { required: "This field is required" })}
              variant="outlined"
              margin="normal"
              error={!!errors.operator}
            />
            {errors.operator && (
              <FormHelperText error>{errors.operator.message}</FormHelperText>
            )}

            <TextField
              label="Value"
              {...register("value", { required: "This field is required" })}
              variant="outlined"
              margin="normal"
              error={!!errors.value}
            />
            {errors.value && (
              <FormHelperText error>{errors.value.message}</FormHelperText>
            )}

            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
        </Box>

        <Box
          style={{
            flex: 0.8,
            padding: "10px",
          }}
        >
          <DataTable data={dataTable} />
        </Box>
      </Box>
    </Box>
  );
};

export default TransformationRules;
