export const examples = {
  basic: {
    title: '기본 사용법',
    description: '기본 Pagination 컴포넌트 사용 예시입니다.',
    codeContent: `import { useState } from 'react';
import { Pagination } from '@seolim/designsystem';

function Example() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <Pagination
        totalItems={100}
        itemsPerPage={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <p>현재 페이지: {currentPage}</p>
    </>
  );
}`,
  },
  variant: {
    title: 'variant (default/compact)',
    description: 'variant prop으로 스타일을 변경할 수 있습니다.',
    codeContent: `import { useState } from 'react';
import { Pagination } from '@seolim/designsystem';

function Example() {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  return (
    <>
      <Pagination
        variant="default"
        totalItems={100}
        itemsPerPage={10}
        currentPage={page1}
        onPageChange={setPage1}
      />
      <Pagination
        variant="compact"
        totalItems={100}
        itemsPerPage={10}
        currentPage={page2}
        onPageChange={setPage2}
      />
    </>
  );
}`,
  },
  pageCount: {
    title: '페이지 수 조절',
    description: 'totalItems와 itemsPerPage로 페이지 수를 조절할 수 있습니다.',
    codeContent: `import { Pagination } from '@seolim/designsystem';

function Example() {
  return (
    <>
      <Pagination totalItems={50} itemsPerPage={10} currentPage={1} onPageChange={() => {}} />
      <Pagination totalItems={100} itemsPerPage={10} currentPage={1} onPageChange={() => {}} />
      <Pagination totalItems={200} itemsPerPage={10} currentPage={5} onPageChange={() => {}} />
    </>
  );
}`,
  },
  itemsPerPage: {
    title: 'itemsPerPage 변경',
    description: '페이지당 아이템 개수를 조절할 수 있습니다.',
    codeContent: `import { Pagination } from '@seolim/designsystem';

function Example() {
  return (
    <>
      <Pagination totalItems={100} itemsPerPage={5} currentPage={1} onPageChange={() => {}} />
      <Pagination totalItems={100} itemsPerPage={20} currentPage={1} onPageChange={() => {}} />
      <Pagination totalItems={100} itemsPerPage={25} currentPage={1} onPageChange={() => {}} />
    </>
  );
}`,
  },
  realWorld: {
    title: '실제 사용 예제',
    description: '실제 서비스에서의 Pagination 사용 예시입니다.',
    codeContent: `import { Pagination } from '@seolim/designsystem';

function Example() {
  return (
    <>
      {/* 블로그 게시글 목록 */}
      <Pagination totalItems={87} itemsPerPage={15} currentPage={1} onPageChange={() => {}} />
      {/* 상품 목록 */}
      <Pagination variant="compact" totalItems={320} itemsPerPage={24} currentPage={5} onPageChange={() => {}} />
      {/* 검색 결과 */}
      <Pagination totalItems={156} itemsPerPage={12} currentPage={7} onPageChange={() => {}} />
    </>
  );
}`,
  },
};
