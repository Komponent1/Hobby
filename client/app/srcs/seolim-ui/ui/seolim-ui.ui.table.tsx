import React from 'react';
import { Table } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiTable: React.FC = () => {
  const sampleData = [
    {
      id: 1, name: '홍길동', age: 25, email: 'hong@example.com',
    },
    {
      id: 2, name: '김철수', age: 30, email: 'kim@example.com',
    },
    {
      id: 3, name: '이영희', age: 28, email: 'lee@example.com',
    },
    {
      id: 4, name: '박민수', age: 32, email: 'park@example.com',
    },
  ];

  const basicColumns = [
    { header: 'ID', accessor: 'id' },
    { header: '이름', accessor: 'name' },
    { header: '나이', accessor: 'age' },
    { header: '이메일', accessor: 'email' },
  ];

  const productData = [
    {
      id: 'P001', product: '노트북', category: '전자기기', price: '1,200,000원', stock: 15,
    },
    {
      id: 'P002', product: '마우스', category: '액세서리', price: '25,000원', stock: 50,
    },
    {
      id: 'P003', product: '키보드', category: '액세서리', price: '89,000원', stock: 30,
    },
    {
      id: 'P004', product: '모니터', category: '전자기기', price: '350,000원', stock: 8,
    },
  ];

  const productColumns = [
    { header: '상품 코드', accessor: 'id' },
    { header: '상품명', accessor: 'product' },
    { header: '카테고리', accessor: 'category' },
    { header: '가격', accessor: 'price' },
    { header: '재고', accessor: 'stock' },
  ];

  return (
    <div className="space-y-6">
      <HeadBox>
        <Title text="Table" />
        <Description text="데이터를 행과 열로 구조화하여 표시하는 테이블 컴포넌트입니다." />
      </HeadBox>

      <div className="space-y-4">
        <Title text="속성" />
        <PropsTable
          datas={[
            { name: 'datas', type: '{ [key: string]: React.ReactNode }[]', description: '테이블에 표시할 데이터 배열입니다.' },
            { name: 'columns', type: '{ header: string; accessor: string }[]', description: '테이블의 컬럼 정의입니다.' },
            { name: 'variant', type: 'default | striped | bordered', description: '테이블의 스타일 변형입니다.' },
            { name: 'selecterable', type: 'boolean', description: '행 선택 기능을 활성화할지 여부입니다.' },
          ]}
        />
      </div>

      <UiBox>
        <Title text="기본 사용법" />
        <Description text="기본적인 테이블 형태입니다." />
        <div className="p-8 mt-4">
          <Table datas={sampleData} columns={basicColumns} />
        </div>
      </UiBox>

      <UiBox>
        <Title text="변형" />
        <Description text="variant 속성으로 테이블의 스타일을 변경할 수 있습니다." />
        <div className="space-y-8 mt-4">
          <div>
            <p className="text-sm font-medium mb-4">Default</p>
            <Table datas={sampleData} columns={basicColumns} variant="default" />
          </div>
          <div>
            <p className="text-sm font-medium mb-4">Striped (줄무늬)</p>
            <Table datas={sampleData} columns={basicColumns} variant="striped" />
          </div>
          <div>
            <p className="text-sm font-medium mb-4">Bordered (테두리)</p>
            <Table datas={sampleData} columns={basicColumns} variant="bordered" />
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="선택 기능" />
        <Description text="selecterable 속성으로 행 선택 기능을 활성화할 수 있습니다." />
        <div className="p-8 mt-4">
          <Table datas={sampleData} columns={basicColumns} selecterable />
        </div>
      </UiBox>

      <UiBox>
        <Title text="사용 예제" />
        <Description text="실제 사용 시나리오 예제입니다." />
        <div className="space-y-8 mt-4">
          <div>
            <p className="text-sm font-medium mb-4">상품 목록</p>
            <Table datas={productData} columns={productColumns} variant="striped" />
          </div>

          <div>
            <p className="text-sm font-medium mb-4">사용자 관리</p>
            <Table
              datas={[
                {
                  id: 1, username: 'admin', role: '관리자', status: '활성', lastLogin: '2025-12-14',
                },
                {
                  id: 2, username: 'user1', role: '사용자', status: '활성', lastLogin: '2025-12-13',
                },
                {
                  id: 3, username: 'user2', role: '사용자', status: '비활성', lastLogin: '2025-12-10',
                },
              ]}
              columns={[
                { header: 'ID', accessor: 'id' },
                { header: '사용자명', accessor: 'username' },
                { header: '역할', accessor: 'role' },
                { header: '상태', accessor: 'status' },
                { header: '마지막 로그인', accessor: 'lastLogin' },
              ]}
              variant="bordered"
              selecterable
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-4">거래 내역</p>
            <Table
              datas={[
                {
                  date: '2025-12-14', type: '입금', amount: '+500,000원', balance: '2,500,000원',
                },
                {
                  date: '2025-12-13', type: '출금', amount: '-150,000원', balance: '2,000,000원',
                },
                {
                  date: '2025-12-12', type: '입금', amount: '+300,000원', balance: '2,150,000원',
                },
                {
                  date: '2025-12-11', type: '출금', amount: '-50,000원', balance: '1,850,000원',
                },
              ]}
              columns={[
                { header: '날짜', accessor: 'date' },
                { header: '유형', accessor: 'type' },
                { header: '금액', accessor: 'amount' },
                { header: '잔액', accessor: 'balance' },
              ]}
              variant="striped"
            />
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="조합" />
        <Description text="다양한 속성을 조합한 예제입니다." />
        <div className="space-y-8 mt-4">
          <div>
            <p className="text-sm font-medium mb-4">Striped + Selectable</p>
            <Table
              datas={productData}
              columns={productColumns}
              variant="striped"
              selecterable
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-4">Bordered + Selectable</p>
            <Table
              datas={sampleData}
              columns={basicColumns}
              variant="bordered"
              selecterable
            />
          </div>
        </div>
      </UiBox>
    </div>
  );
};

export default UiTable;
