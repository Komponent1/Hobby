import React from 'react';
import { Table } from '@seolim/designsystem';

type Props = {
  datas: {name: string; type: string; description: string;}[],
};
const PropsTable: React.FC<Props> = ({ datas }) => {
  const tableData = datas.map((data) => ({
    name: data.name,
    type: <code>{data.type}</code>,
    description: data.description,
  }));

  const columns = [
    { header: 'Prop Name', accessor: 'name' },
    { header: 'Type', accessor: 'type' },
    { header: 'Description', accessor: 'description' },
  ];

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="text-sm">
        <Table datas={tableData} columns={columns} variant="striped" />
      </div>
    </div>
  );
};

export default PropsTable;
