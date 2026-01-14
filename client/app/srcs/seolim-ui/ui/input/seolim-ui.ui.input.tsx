import React from "react";
import { Input } from "@seolim/designsystem";
import {
  Description,
  UiBox,
  HeadBox,
  Title,
  PropsTable,
} from "../../component";
import { examples } from "./seolim-ui.ui.input.example";

const UiInput: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Input" />
      <Description text="사용자 데이터 입력을 위한 텍스트 입력 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable
        datas={[
          {
            name: "value",
            type: "string",
            default: "-",
            description: "입력 필드의 값입니다.",
          },
          {
            name: "placeholder",
            type: "string",
            default: "-",
            description: "입력 필드의 플레이스홀더 텍스트입니다.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "입력이 비활성화될지 여부입니다.",
          },
          {
            name: "error",
            type: "boolean",
            default: "false",
            description: "입력이 오류 상태인지 여부입니다.",
          },
          {
            name: "onChange",
            type: "(value: string) => void",
            default: "-",
            description: "입력 값이 변경될 때 실행되는 콜백 함수입니다.",
          },
          {
            name: "withSubmitButton",
            type: "boolean",
            default: "false",
            description: "제출 버튼이 함께 렌더링될지 여부입니다.",
          },
          {
            name: "onClickSubmitButton",
            type: "() => void",
            default: "-",
            description: "제출 버튼이 클릭될 때 실행되는 콜백 함수입니다.",
          },
        ]}
      />
    </div>

    <UiBox {...examples.basic}>
      <div className="mt-4">
        <Input
          value=""
          onChange={() => {}}
          placeholder="여기에 텍스트를 입력하세요"
        />
      </div>
    </UiBox>

    <UiBox {...examples.state}>
      <div className="space-y-3 mt-4">
        <Input value="" onChange={() => {}} placeholder="일반 입력" />
        <Input value="비활성화된 입력" onChange={() => {}} disabled />
        <Input value="오류 입력" onChange={() => {}} error />
      </div>
    </UiBox>

    <UiBox {...examples.placeholder}>
      <div className="space-y-3 mt-4">
        <Input value="" onChange={() => {}} placeholder="이름을 입력하세요" />
        <Input value="" onChange={() => {}} placeholder="이메일을 입력하세요" />
        <Input value="" onChange={() => {}} placeholder="메시지를 입력하세요" />
      </div>
    </UiBox>

    <UiBox {...examples.withSubmitButton}>
      <div className="space-y-3 mt-4">
        <Input
          value=""
          onChange={() => {}}
          placeholder="검색어를 입력하세요"
          withSubmitButton={true}
          onClickSubmitButton={() => {}}
        />
      </div>
    </UiBox>
  </div>
);

export default UiInput;
