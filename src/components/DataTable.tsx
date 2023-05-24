import { FC } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(2),
  },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#f5f5f5",
  },
}));

type Props = {
  data: {
    message: string;
    headers: string[];
    rows: (string | number | null | undefined)[][];
  };
};

const DataTable: FC<Props> = ({ data }) => {
  const classes = useStyles();

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {data.headers.map((header, index) => (
            <TableCell key={index} className={classes.headerCell}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>
                {cell !== null && cell !== undefined ? String(cell) : "-"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
