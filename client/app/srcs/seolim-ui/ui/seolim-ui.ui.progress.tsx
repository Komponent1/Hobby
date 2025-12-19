import React, { useState, useEffect } from 'react';
import { Progress } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiProgress: React.FC = () => {
  const [barProgress, setBarProgress] = useState(0);
  const [circleProgress, setCircleProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBarProgress((prev) => {
        if (prev >= 0.99) return 0;
        return prev + 0.1;
      });
      setCircleProgress((prev) => {
        if (prev >= 0.99) return 0;
        return prev + 0.1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <HeadBox>
        <Title text="Progress" />
        <Description text="작업의 진행 상태를 시각적으로 표시하는 프로그레스 컴포넌트입니다." />
      </HeadBox>

      <div className="space-y-4">
        <Title text="속성" />
        <PropsTable
          datas={[
            {
              name: 'progress', type: 'number', default: '-', description: '진행률 (0 - 1 사이의 값)입니다.',
            },
            {
              name: 'size', type: 'sm | md | lg', default: 'md', description: '프로그레스의 크기입니다.',
            },
            {
              name: 'variant', type: 'bar | circle', default: 'bar', description: '프로그레스의 형태입니다.',
            },
            {
              name: 'color', type: 'string', default: '-', description: '프로그레스의 색상입니다.',
            },
            {
              name: 'label', type: 'string', default: '-', description: '프로그레스 바 내부 또는 하단에 표시될 라벨입니다.',
            },
            {
              name: 'percent', type: 'boolean', default: 'false', description: '퍼센트 표시 여부입니다.',
            },
            {
              name: 'width', type: 'number | string', default: '-', description: '바 형태일 때 프로그레스의 너비입니다. (bar variant 전용)',
            },
          ]}
        />
      </div>

      <UiBox>
        <Title text="변형" />
        <Description text="프로그레스 변형에는 바(bar)와 원형(circle) 스타일이 있습니다." />
        <div className="space-y-6 mt-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">바 형태</p>
            <Progress progress={0.7} variant="bar" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">원형 형태</p>
            <Progress progress={0.7} variant="circle" />
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="크기" />
        <Description text="프로그레스 크기는 작은 것부터 큰 것까지 다양합니다." />
        <div className="space-y-6 mt-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">바 형태</p>
            <div className="space-y-3">
              <Progress progress={0.5} size="sm" variant="bar" />
              <Progress progress={0.5} size="md" variant="bar" />
              <Progress progress={0.5} size="lg" variant="bar" />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">원형 형태</p>
            <div className="flex gap-4 items-center">
              <Progress progress={0.5} size="sm" variant="circle" />
              <Progress progress={0.5} size="md" variant="circle" />
              <Progress progress={0.5} size="lg" variant="circle" />
            </div>
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="진행률" />
        <Description text="다양한 진행률을 표시할 수 있습니다." />
        <div className="space-y-4 mt-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">0% (시작)</p>
            <Progress progress={0} variant="bar" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">25%</p>
            <Progress progress={0.25} variant="bar" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">50%</p>
            <Progress progress={0.5} variant="bar" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">75%</p>
            <Progress progress={0.75} variant="bar" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">100% (완료)</p>
            <Progress progress={1} variant="bar" />
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="퍼센트 표시" />
        <Description text="percent prop을 사용하여 진행률을 퍼센트로 표시할 수 있습니다." />
        <div className="space-y-6 mt-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">바 형태 (퍼센트 표시)</p>
            <Progress progress={0.65} variant="bar" percent />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">원형 형태 (퍼센트 표시)</p>
            <Progress progress={0.65} variant="circle" percent />
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="라벨" />
        <Description text="라벨을 추가하여 프로그레스의 의미를 명확히 할 수 있습니다." />
        <div className="space-y-6 mt-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">바 형태</p>
            <Progress progress={0.6} variant="bar" label="업로드 중..." />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">원형 형태</p>
            <Progress progress={0.6} variant="circle" label="로딩" />
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="라벨과 퍼센트" />
        <Description text="라벨과 퍼센트를 동시에 표시할 수 있습니다." />
        <div className="space-y-6 mt-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">바 형태 (라벨 + 퍼센트)</p>
            <Progress progress={0.45} variant="bar" label="다운로드 중..." percent />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">원형 형태 (라벨 + 퍼센트)</p>
            <Progress progress={0.75} variant="circle" label="처리 중" percent />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">다양한 조합</p>
            <div className="space-y-3">
              <Progress
                progress={0.33}
                variant="bar"
                label="업로드"
                percent
                color="#3b82f6"
                size="sm"
              />
              <Progress
                progress={0.67}
                variant="bar"
                label="변환 중"
                percent
                color="#22c55e"
                size="md"
              />
              <Progress
                progress={0.88}
                variant="bar"
                label="완료 중"
                percent
                color="#a855f7"
                size="lg"
              />
            </div>
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="색상" />
        <Description text="color prop을 사용하여 프로그레스의 색상을 변경할 수 있습니다." />
        <div className="space-y-4 mt-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">파란색</p>
            <Progress progress={0.7} variant="bar" color="#3b82f6" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">초록색</p>
            <Progress progress={0.7} variant="bar" color="#22c55e" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">빨간색</p>
            <Progress progress={0.7} variant="bar" color="#ef4444" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">보라색 (원형)</p>
            <Progress progress={0.7} variant="circle" color="#a855f7" />
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="너비 설정" />
        <Description text="바 형태일 때 width prop으로 너비를 설정할 수 있습니다." />
        <div className="space-y-4 mt-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">너비: 200px</p>
            <Progress progress={0.6} variant="bar" width={200} />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">너비: 50%</p>
            <Progress progress={0.6} variant="bar" width="50%" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">너비: 100%</p>
            <Progress progress={0.6} variant="bar" width="100%" />
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="예제" />
        <Description text="실제 사용 시나리오 예제입니다." />
        <div className="space-y-6 mt-4">
          <div>
            <p className="text-sm font-medium mb-2">파일 업로드</p>
            <Progress
              progress={0.45}
              variant="bar"
              label="파일 업로드 중..."
              percent
              color="#3b82f6"
              width="100%"
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-2">다운로드 진행</p>
            <Progress
              progress={0.82}
              variant="bar"
              label="다운로드 중"
              percent
              color="#22c55e"
              size="lg"
              width="100%"
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-2">프로젝트 완료율</p>
            <div className="flex gap-4 items-center">
              <Progress
                progress={0.68}
                variant="circle"
                percent
                color="#a855f7"
                size="lg"
              />
              <div>
                <p className="text-sm font-medium">프로젝트 진행 상황</p>
                <p className="text-xs text-gray-500">15개 중 10개 완료</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">여러 단계 진행</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>1단계: 완료</span>
                  <span>100%</span>
                </div>
                <Progress progress={1} variant="bar" color="#22c55e" size="sm" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>2단계: 진행 중</span>
                  <span>60%</span>
                </div>
                <Progress progress={0.6} variant="bar" color="#3b82f6" size="sm" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>3단계: 대기 중</span>
                  <span>0%</span>
                </div>
                <Progress progress={0} variant="bar" color="#9ca3af" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="조합" />
        <Description text="다양한 속성을 조합하여 커스텀 프로그레스를 만들 수 있습니다." />
        <div className="space-y-4 mt-4">
          <Progress
            progress={0.35}
            variant="bar"
            size="sm"
            color="#f59e0b"
            label="작은 크기"
            percent
            width="300px"
          />
          <Progress
            progress={0.65}
            variant="bar"
            size="md"
            color="#ec4899"
            label="중간 크기"
            percent
            width="400px"
          />
          <Progress
            progress={0.85}
            variant="bar"
            size="lg"
            color="#8b5cf6"
            label="큰 크기"
            percent
            width="100%"
          />

          <div className="flex gap-6 mt-6">
            <Progress
              progress={0.3}
              variant="circle"
              size="sm"
              color="#f59e0b"
              percent
            />
            <Progress
              progress={0.6}
              variant="circle"
              size="md"
              color="#ec4899"
              percent
            />
            <Progress
              progress={0.9}
              variant="circle"
              size="lg"
              color="#8b5cf6"
              percent
            />
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="애니메이션" />
        <Description text="프로그레스가 10%씩 증가하는 트랜지션 효과를 확인할 수 있습니다." />
        <div className="space-y-6 mt-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">바 형태 (자동 증가)</p>
            <Progress
              progress={barProgress}
              variant="bar"
              label="로딩 중..."
              percent
              color="#3b82f6"
              width="100%"
              size="lg"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">원형 형태 (자동 증가)</p>
            <Progress
              progress={circleProgress}
              variant="circle"
              label="처리 중"
              percent
              color="#22c55e"
              size="lg"
            />
          </div>
        </div>
      </UiBox>
    </div>
  );
};

export default UiProgress;
