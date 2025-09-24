import React from 'react';

const ThNameMatch: Record<string, string> = {
  name: '이름',
};
const StaffTh: React.FC = () => (
  <thead>
    <tr className="border-b border-gray-300">
      {Object.entries(ThNameMatch).map(([key, value]) => (
        <th
          key={key}
          className="px-6 py-3 text-left"
        >
          {value}
        </th>
      ))}
      <th>{' '}</th>
    </tr>
  </thead>
);

export default StaffTh;
