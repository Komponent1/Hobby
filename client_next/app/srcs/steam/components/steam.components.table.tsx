/* eslint-disable react/no-array-index-key */
import Image from "next/image";
import React, { useMemo } from 'react';

type Props<T> = {
  datas: T[];
};
const Table = <T extends {[key: string]: {type: 'image' | 'text', value: string | number}}>({datas}: Props<T>) => {
  const categories = useMemo(() => {
    if (datas.length === 0) return [];
    return Object.keys(datas[0]);
  }, [datas]);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {categories.map((category) => (
              <th key={`${category}`} scope="col" className="px-6 py-3">
                {category}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={`${index}_data_tr`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              {categories.map((category) => (
                <td key={`${category}`} className="px-6 py-4">
                  {data[category].type === 'image' ? (
                    <Image src={data[category].value as string} layout="fixed" objectFit="cover" width={200} height={80} alt="no photo" />
                  ) : (
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {data[category].value}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
