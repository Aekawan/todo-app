import { TableData, Row } from '../types/table';

export const convertData = (data: TableData): Row[] => {
  const { columns, data: rows } = data;
  return rows.map((row: any[]) => {
    const rowObject: Row = {};
    columns.forEach((col: any, index: number) => {
      rowObject[col.key] = row[index];
    });
    return rowObject;
  });
};