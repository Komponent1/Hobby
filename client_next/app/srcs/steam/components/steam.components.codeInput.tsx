import React, { useState } from 'react';
import Form from '../../common/common.components/common.components.form';

type Props = {
  onSubmit: (code: string) => void;
};
const CodeInput: React.FC<Props> = ({onSubmit}) => {
  const [code, setCode] = useState<string>('');

  return (
    <div>
      <Form placeholder="스팀 코드를 넣어주세요" buttonText="검색" labelText="스팀 코드" value={code} setValue={setCode} onSubmit={onSubmit} labelId="steamCode" />
    </div>
  );
};

export default CodeInput;
