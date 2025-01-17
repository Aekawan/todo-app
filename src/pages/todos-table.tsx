import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Table from '../components/Table';
import { convertData } from '../utils/convertData';
import { TableData } from '../types/table';
import Layout from '@/components/Layouts/Layout';

const jsonData: TableData = {
  columns: [
    { key: "id", name: "" },
    { key: "no", name: "No." },
    { key: "title", name: "Title" },
    { key: "desc", name: "Description" },
    { key: "date", name: "Created Date" }
  ],
  data: [
    ["f22ecad5-cbb6-402b-995f-6867792bc9c6", 1, "Job 1", "This is job 1", "1 Oct 2023 12:03:48"],
    ["6a412fa7-2c3b-4e38-8973-2b32479bffab", 2, "Job 2", "This is job 2", "11 Oct 2023 10:03:48"],
    ["2c302941-3ba7-413d-84a6-20503355b08a", 3, "Job 3", "This is job 3", "14 Oct 2023 18:34:48"],
    ["eff7e063-3e18-4790-95b4-abf62470e874", 4, "Job 4", "This is job 4", "1 Oct 2023 09:26:48"]
  ]
};

const tableData = convertData(jsonData);

const TodosTablePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="Manage your todos efficiently with our Todo List app." />
      </Head>
      <div className="mt-8">
        <Table data={tableData} columns={jsonData.columns} />
      </div>
    </>
  );
};

(TodosTablePage as any).Layout = Layout;

export default TodosTablePage;