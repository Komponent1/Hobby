import React from 'react';

type Props = {
  datas: {name: string; type: string; description: string;}[],
};
const PropsTable: React.FC<Props> = ({ datas }) => (
  <div>
    <table className="w-full table-auto border-collapse border border-gray-400">
      <thead>
        <tr>
          <th className="border border-gray-400 px-4 py-2 text-left">Prop Name</th>
          <th className="border border-gray-400 px-4 py-2 text-left">Type</th>
          <th className="border border-gray-400 px-4 py-2 text-left">Description</th>
        </tr>
      </thead>
      <tbody>
        {datas.map((data) => (
          <tr key={data.name}>
            <td className="border border-gray-400 px-4 py-2 align-top">{data.name}</td>
            <td className="border border-gray-400 px-4 py-2 align-top"><code>{data.type}</code></td>
            <td className="border border-gray-400 px-4 py-2 align-top">{data.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default PropsTable;
