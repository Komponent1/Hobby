export const examples = {
  basic: {
    title: '기본 사용법',
    description: '기본 테이블 사용 예제입니다.',
    codeContent: `import { Table } from '@seolim/designsystem';

function Example() {
  const columns = [
    { header: '이름', key: 'name' },
    { header: '이메일', key: 'email' },
    { header: '직급', key: 'position' }
  ];
  
  const data = [
    { name: '김철수', email: 'kim@example.com', position: '개발자' },
    { name: '이영희', email: 'lee@example.com', position: '디자이너' },
    { name: '박민준', email: 'park@example.com', position: '매니저' }
  ];

  return <Table columns={columns} data={data} />;
}`,
  },
  variant: {
    title: '변형',
    description: 'variant prop으로 테이블 스타일을 변경할 수 있습니다.',
    codeContent: `import { Table } from '@seolim/designsystem';

function Example() {
  const columns = [
    { header: '상품명', key: 'name' },
    { header: '가격', key: 'price' },
    { header: '재고', key: 'stock' }
  ];
  
  const data = [
    { name: '노트북', price: '1,500,000원', stock: '15개' },
    { name: '마우스', price: '50,000원', stock: '50개' },
    { name: '키보드', price: '150,000원', stock: '25개' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 16 }}>Default</p>
        <Table variant="default" columns={columns} data={data} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 16 }}>Striped</p>
        <Table variant="striped" columns={columns} data={data} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 16 }}>Bordered</p>
        <Table variant="bordered" columns={columns} data={data} />
      </div>
    </div>
  );
}`,
  },
  selectable: {
    title: '선택 가능',
    description: 'selectable prop으로 행 선택 기능을 추가할 수 있습니다.',
    codeContent: `import { Table } from '@seolim/designsystem';
import { useState } from 'react';

function Example() {
  const [selectedRows, setSelectedRows] = useState([]);
  
  const columns = [
    { header: '사용자', key: 'name' },
    { header: '이메일', key: 'email' },
    { header: '가입일', key: 'joinDate' }
  ];
  
  const data = [
    { name: '김철수', email: 'kim@example.com', joinDate: '2024-01-15' },
    { name: '이영희', email: 'lee@example.com', joinDate: '2024-01-18' },
    { name: '박민준', email: 'park@example.com', joinDate: '2024-01-20' }
  ];

  return (
    <Table 
      selectable 
      columns={columns} 
      data={data}
      selectedRows={selectedRows}
      onSelectChange={setSelectedRows}
    />
  );
}`,
  },
  realworld: {
    title: '사용 예제',
    description: '상품 목록, 사용자 관리, 거래 내역 등 실제 시나리오에 활용할 수 있습니다.',
    codeContent: `import { Table } from '@seolim/designsystem';

function Example() {
  const productColumns = [
    { header: '상품 코드', accessor: 'id' },
    { header: '상품명', accessor: 'product' },
    { header: '카테고리', accessor: 'category' },
    { header: '가격', accessor: 'price' },
    { header: '재고', accessor: 'stock' },
  ];

  const productData = [
    { id: 'P001', product: '노트북', category: '전자기기', price: '1,200,000원', stock: 15 },
    { id: 'P002', product: '마우스', category: '액세서리', price: '25,000원', stock: 50 },
    { id: 'P003', product: '키보드', category: '액세서리', price: '89,000원', stock: 30 },
    { id: 'P004', product: '모니터', category: '전자기기', price: '350,000원', stock: 8 },
  ];

  return (
    <div style={{ display: 'grid', gap: 32 }}>
      <Table datas={productData} columns={productColumns} variant="striped" />

      <Table
        datas={[
          { id: 1, username: 'admin', role: '관리자', status: '활성', lastLogin: '2025-12-14' },
          { id: 2, username: 'user1', role: '사용자', status: '활성', lastLogin: '2025-12-13' },
          { id: 3, username: 'user2', role: '사용자', status: '비활성', lastLogin: '2025-12-10' },
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

      <Table
        datas={[
          { date: '2025-12-14', type: '입금', amount: '+500,000원', balance: '2,500,000원' },
          { date: '2025-12-13', type: '출금', amount: '-150,000원', balance: '2,000,000원' },
          { date: '2025-12-12', type: '입금', amount: '+300,000원', balance: '2,150,000원' },
          { date: '2025-12-11', type: '출금', amount: '-50,000원', balance: '1,850,000원' },
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
  );
}`,
  },
  combination: {
    title: '조합',
    description: 'variant와 선택 기능을 함께 조합해 다양한 테이블을 만들 수 있습니다.',
    codeContent: `import { Table } from '@seolim/designsystem';

function Example() {
  const productColumns = [
    { header: '상품 코드', accessor: 'id' },
    { header: '상품명', accessor: 'product' },
    { header: '카테고리', accessor: 'category' },
    { header: '가격', accessor: 'price' },
    { header: '재고', accessor: 'stock' },
  ];

  const productData = [
    { id: 'P001', product: '노트북', category: '전자기기', price: '1,200,000원', stock: 15 },
    { id: 'P002', product: '마우스', category: '액세서리', price: '25,000원', stock: 50 },
    { id: 'P003', product: '키보드', category: '액세서리', price: '89,000원', stock: 30 },
  ];

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <Table datas={productData} columns={productColumns} variant="striped" selecterable />
      <Table datas={productData} columns={productColumns} variant="bordered" selecterable />
    </div>
  );
}`,
  },
};
