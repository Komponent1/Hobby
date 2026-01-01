/* eslint-disable no-alert */
import React from 'react';
import { Stepper } from '@seolim/designsystem';
import Title from '../../component/seolim-ui.component.title';
import Description from '../../component/seolim-ui.component.description';
import PropsTable from '../../component/seolim-ui.component.propsTable';
import HeadBox from '../../component/seolim-ui.component.headBox';
import UiBox from '../../component/seolim-ui.component.uibox';
import { examples } from './seolim-ui.ui.stepper.example';

const UiStepper: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Stepper" />
      <Description text="여러 단계를 시각적으로 표현하는 Stepper 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable
        datas={[
          {
            name: 'stepNumber', type: 'number', default: '-', description: '총 단계 수를 지정합니다.',
          },
          {
            name: 'variant', type: "'default' | 'bottomLabel' | 'sideLabel'", default: 'default', description: 'Stepper의 스타일 변형을 지정합니다.',
          },
          {
            name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: 'Stepper의 크기를 지정합니다.',
          },
          {
            name: 'labels', type: 'string[]', default: '-', description: '각 단계별 라벨을 지정합니다.',
          },
          {
            name: 'currentStep', type: 'number', default: '0', description: '현재 진행 중인 단계(0부터 시작).',
          },
          {
            name: 'onStepClick', type: '(stepIndex: number) => void', default: '-', description: '단계 클릭 시 호출되는 콜백.',
          },
        ]}
      />
    </div>

    <UiBox {...examples.size}>
      <Title text="size prop 예제" />
      <Description text="size prop(sm, md, lg)에 따라 Stepper의 크기가 달라집니다." />
      <div className="flex flex-col gap-6 mt-4">
        <div>
          <div className="mb-1 text-xs text-gray-600">{`size="sm"`}</div>
          <Stepper stepNumber={4} size="sm" currentStep={1} labels={["단계1", "단계2", "단계3", "단계4"]} />
        </div>
        <div>
          <div className="mb-1 text-xs text-gray-600">{`size="md" (default)`}</div>
          <Stepper stepNumber={4} size="md" currentStep={1} labels={["단계1", "단계2", "단계3", "단계4"]} />
        </div>
        <div>
          <div className="mb-1 text-xs text-gray-600">{`size="lg"`}</div>
          <Stepper stepNumber={4} size="lg" currentStep={1} labels={["단계1", "단계2", "단계3", "단계4"]} />
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.variant}>
      <Title text="variant prop 예제" />
      <Description text="variant prop(default, bottomLabel, sideLabel)에 따라 Stepper의 스타일이 달라집니다." />
      <div className="flex flex-col gap-6 mt-4">
        <div>
          <div className="mb-1 text-xs text-gray-600">{`variant="default" (default)`}</div>
          <Stepper stepNumber={4} variant="default" currentStep={1} labels={["단계1", "단계2", "단계3", "단계4"]} />
        </div>
        <div>
          <div className="mb-1 text-xs text-gray-600">{`variant="bottomLabel"`}</div>
          <Stepper stepNumber={3} variant="bottomLabel" currentStep={2} labels={["시작", "중간", "완료"]} />
        </div>
        <div>
          <div className="mb-1 text-xs text-gray-600">{`variant="sideLabel"`}</div>
          <Stepper stepNumber={5} variant="sideLabel" currentStep={0} labels={["A", "B", "C", "D", "E"]} />
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.realworld}>
      <Title text="실제 사용 예제" />
      <Description text="폼, 주문, 회원가입 등 여러 단계가 필요한 UI에서 Stepper를 활용할 수 있습니다." />
      <div className="bg-gray-100 rounded-lg p-8 items-center">
        <div>
          <Stepper
            stepNumber={3}
            currentStep={1}
            labels={["정보 입력", "확인", "완료"]}
            onStepClick={(idx) => alert(`${idx + 1}단계로 이동`)}
          />
        </div>
        <div className="mt-8 w-full max-w-md bg-white rounded shadow p-6">
          <div className="text-lg font-bold mb-2">2단계: 확인</div>
          <div className="text-gray-600">입력한 정보를 확인하고 다음 단계로 진행하세요.</div>
        </div>
      </div>
    </UiBox>
  </div>
);

export default UiStepper;
