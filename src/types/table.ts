export interface Column {
  key: string;
  name: string;
}

export interface Row {
  [key: string]: any;
}

export interface TableData {
  columns: Column[];
  data: any[][];
}