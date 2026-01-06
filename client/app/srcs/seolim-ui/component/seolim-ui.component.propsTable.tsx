import React from 'react';
import { Table } from '@seolim/designsystem';

type Props = {
  datas: {name: string; type: string; default: string; description: string;}[],
};
const PropsTable: React.FC<Props> = ({ datas }) => {
  const tableData = datas.map((data) => ({
    name: data.name,
    type: <code>{data.type}</code>,
    default: data.default,
    description: data.description,
  }));

  const columns = [
    { header: 'Prop Name', accessor: 'name' },
    { header: 'Type', accessor: 'type' },
    { header: 'Default', accessor: 'default' },
    { header: 'Description', accessor: 'description' },
  ];

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden mt-4">
      <div className="text-sm">
        <Table datas={tableData} columns={columns} variant="striped" />
      </div>
    </div>
  );
};

export default PropsTable;
