/* eslint-disable react/no-array-index-key */
import Image from "next/image";
import React, { useMemo } from 'react';
import { GameTable } from '../dto/steam.dto.game';

const TableName: { [key in keyof GameTable]: string } = {
  thumbnail: '썸네일',
  name: '이름',
  playtime: '플레이 시간',
  price: '가격',
  playEfficency: '1000원당 플탐',
  releaseDate: '출시일',
  rating: '스팀 평가',
};

type Props<T> = {
  datas: T[];
  sortData: (key: keyof T) => void;
};
const Table = <T extends {[key: string]: {type: 'image' | 'text', value: string, sort?: number}}>({datas, sortData}: Props<T>) => {
  const categories = useMemo(() => {
    if (datas.length === 0) return [];
    return Object.keys(datas[0]);
  }, [datas]) as (keyof GameTable)[];
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {categories.map((category) => (
              <th key={`${category}`} scope="col">
                <button
                  type="button"
                  className="w-full h-full px-6 py-3 text-left"
                  disabled={datas[0][category].sort === undefined}
                  onClick={
                    () => datas[0][category].sort !== undefined && sortData(category as keyof T)
                  }
                >
                  {TableName[category]}
                  <span className="text-[8px]">{datas[0][category].sort !== undefined ? ' ▼' : ''}</span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={`${index}_data_tr`} className="bg-white border-b hover:bg-gray-50">
              {categories.map((category) => (
                <td key={`${category}`} className="px-6 py-4">
                  {data[category].type === 'image' ? (
                    <Image src={data[category].value as string} className="object-cover" width={200} height={80} alt="no photo" />
                  ) : (
                    <span className="font-semibold text-gray-900">
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
