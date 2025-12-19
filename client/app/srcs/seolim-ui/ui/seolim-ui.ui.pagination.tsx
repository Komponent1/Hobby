import React, { useState } from 'react';
import { Pagenation } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiPagination: React.FC = () => {
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);

  return (
    <div className="space-y-6">
      <HeadBox>
        <Title text="Pagination" />
        <Description text="여러 페이지로 나뉜 콘텐츠를 탐색할 수 있는 페이지네이션 컴포넌트입니다." />
      </HeadBox>

      <div className="space-y-4">
        <Title text="속성" />
        <PropsTable
          datas={[
            {
              name: 'variant', type: 'default | compact', default: 'default', description: '페이지네이션의 스타일 변형입니다.',
            },
            {
              name: 'totalItems', type: 'number', default: '-', description: '전체 아이템 개수입니다.',
            },
            {
              name: 'itemsPerPage', type: 'number', default: '-', description: '페이지당 아이템 개수입니다.',
            },
            {
              name: 'currentPage', type: 'number', default: '1', description: '현재 페이지 번호입니다.',
            },
            {
              name: 'onPageChange', type: '(page: number) => void', default: '-', description: '페이지 변경 시 호출되는 콜백 함수입니다.',
            },
          ]}
        />
      </div>

      <UiBox>
        <Title text="기본 사용법" />
        <Description text="기본 페이지네이션 스타일입니다. 좌우로 페이지가 남은 경우 ... 이 표시됩니다." />
        <div className="mt-4">
          <Pagenation
            totalItems={100}
            itemsPerPage={10}
            currentPage={currentPage1}
            onPageChange={setCurrentPage1}
          />
          <p className="text-sm text-gray-600 mt-2">
            현재 페이지:
            {currentPage1}
          </p>
        </div>
      </UiBox>

      <UiBox>
        <Title text="변형" />
        <Description text="compact 변형은 더 간결한 스타일을 제공합니다." />
        <div className="space-y-6 mt-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Default</p>
            <Pagenation
              variant="default"
              totalItems={100}
              itemsPerPage={10}
              currentPage={currentPage2}
              onPageChange={setCurrentPage2}
            />
            <p className="text-sm text-gray-600 mt-2">
              현재 페이지:
              {currentPage2}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Compact</p>
            <Pagenation
              variant="compact"
              totalItems={100}
              itemsPerPage={10}
              currentPage={currentPage3}
              onPageChange={setCurrentPage3}
            />
            <p className="text-sm text-gray-600 mt-2">
              현재 페이지:
              {currentPage3}
            </p>
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="페이지 수" />
        <Description text="totalItems와 itemsPerPage를 조절하여 다양한 페이지 수를 표현할 수 있습니다." />
        <div className="space-y-6 mt-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">5페이지 (50개 아이템, 페이지당 10개)</p>
            <Pagenation
              totalItems={50}
              itemsPerPage={10}
              currentPage={1}
              onPageChange={() => {}}
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">10페이지 (100개 아이템, 페이지당 10개)</p>
            <Pagenation
              totalItems={100}
              itemsPerPage={10}
              currentPage={1}
              onPageChange={() => {}}
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">20페이지 (200개 아이템, 페이지당 10개)</p>
            <Pagenation
              totalItems={200}
              itemsPerPage={10}
              currentPage={5}
              onPageChange={() => {}}
            />
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="다양한 itemsPerPage" />
        <Description text="페이지당 아이템 개수를 조절할 수 있습니다." />
        <div className="space-y-6 mt-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">페이지당 5개 아이템</p>
            <Pagenation
              totalItems={100}
              itemsPerPage={5}
              currentPage={1}
              onPageChange={() => {}}
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">페이지당 20개 아이템</p>
            <Pagenation
              totalItems={100}
              itemsPerPage={20}
              currentPage={1}
              onPageChange={() => {}}
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">페이지당 25개 아이템</p>
            <Pagenation
              totalItems={100}
              itemsPerPage={25}
              currentPage={1}
              onPageChange={() => {}}
            />
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="실제 사용 예제" />
        <Description text="일반적인 사용 시나리오입니다." />
        <div className="space-y-6 mt-4">
          <div>
            <p className="text-sm font-medium mb-2">블로그 게시글 목록</p>
            <p className="text-xs text-gray-500 mb-3">전체 게시글 87개, 페이지당 15개씩 표시</p>
            <Pagenation
              totalItems={87}
              itemsPerPage={15}
              currentPage={1}
              onPageChange={() => {}}
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-2">상품 목록</p>
            <p className="text-xs text-gray-500 mb-3">전체 상품 320개, 페이지당 24개씩 표시</p>
            <Pagenation
              variant="compact"
              totalItems={320}
              itemsPerPage={24}
              currentPage={5}
              onPageChange={() => {}}
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-2">검색 결과</p>
            <p className="text-xs text-gray-500 mb-3">전체 결과 156개, 페이지당 12개씩 표시</p>
            <Pagenation
              totalItems={156}
              itemsPerPage={12}
              currentPage={7}
              onPageChange={() => {}}
            />
          </div>
        </div>
      </UiBox>
    </div>
  );
};

export default UiPagination;
