import React from 'react';
import { Column, Row } from '../types/table';

interface TableProps {
  data: Row[];
  columns: Column[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map(column => (
              column.key !== 'id' && (
                <th key={column.key} className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">
                  {column.name}
                </th>
              )
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id} className="whitespace-nowrap">
              {columns.map(column => (
                column.key !== 'id' && (
                  <td key={`${row.id}-${column.key}`} className="py-2 px-4 border-b border-gray-200 text-sm">
                    {row[column.key]}
                  </td>
                )
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;