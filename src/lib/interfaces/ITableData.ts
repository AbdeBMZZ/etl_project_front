export interface ITableData {
  headers: string[];
  rows: (string | number)[][];
  message: string;
  csv_file_ID: number;
  transformed_file_ID?: number;
}
