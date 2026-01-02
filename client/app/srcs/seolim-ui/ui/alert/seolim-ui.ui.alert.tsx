import React from 'react';
import { Alert } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../../component';
import { propsTable, examples } from './seolim-ui.ui.alert.example';

const UiAlert: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Alert" />
      <Description text="사용자에게 중요한 정보를 전달하는 알림 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable
        datas={propsTable}
      />
    </div>

    <UiBox {...examples.type}>
      <div className="space-y-3 mt-4">
        <Alert message="성공적으로 완료되었습니다." type="success" />
        <Alert message="오류가 발생했습니다." type="danger" />
        <Alert message="참고하세요." type="info" />
        <Alert message="주의가 필요합니다." type="warning" />
      </div>
    </UiBox>

    <UiBox {...examples.variant}>
      <div className="space-y-3 mt-4">
        <Alert message="채워진 알림입니다." variant="filled" type="info" />
        <Alert message="아웃라인 알림입니다." variant="outlined" type="info" />
      </div>
    </UiBox>

    <UiBox {...examples.size}>
      <div className="space-y-3 mt-4">
        <Alert message="작은 크기 알림" size="sm" type="info" />
        <Alert message="중간 크기 알림" size="md" type="info" />
        <Alert message="큰 크기 알림" size="lg" type="info" />
      </div>
    </UiBox>

    <UiBox {...examples.head}>
      <div className="space-y-3 mt-4">
        <Alert head="성공" message="작업이 성공적으로 완료되었습니다." type="success" />
        <Alert head="오류 발생" message="처리 중 오류가 발생했습니다." type="danger" />
        <Alert head="알림" message="새로운 업데이트가 있습니다." type="info" />
        <Alert head="주의" message="이 작업은 되돌릴 수 없습니다." type="warning" />
      </div>
    </UiBox>

    <UiBox {...examples.example}>
      <div className="space-y-4 mt-4">
        <Alert
          head="계정 생성 완료"
          message="회원가입이 완료되었습니다. 이메일을 확인해 주세요."
          type="success"
          variant="filled"
        />

        <Alert
          head="파일 업로드 실패"
          message="파일 크기가 10MB를 초과합니다. 다시 시도해 주세요."
          type="danger"
          variant="outlined"
        />

        <Alert
          message="이 기능은 베타 버전입니다."
          type="info"
          size="sm"
        />

        <Alert
          head="보안 업데이트"
          message="비밀번호를 6개월마다 변경하는 것이 좋습니다."
          type="warning"
          variant="outlined"
          size="lg"
        />
      </div>
    </UiBox>

    <UiBox {...examples.combination}>
      <div className="space-y-3 mt-4">
        <Alert
          head="작은 성공 알림"
          message="저장되었습니다."
          type="success"
          variant="outlined"
          size="sm"
        />
        <Alert
          head="중간 에러 알림"
          message="연결에 실패했습니다."
          type="danger"
          variant="filled"
          size="md"
        />
        <Alert
          head="큰 경고 알림"
          message="이 작업은 시스템에 영향을 줄 수 있습니다."
          type="warning"
          variant="outlined"
          size="lg"
        />
      </div>
    </UiBox>
  </div>
);

export default UiAlert;
