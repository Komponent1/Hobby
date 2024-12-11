import React, { useState } from 'react';

type Props = {
  onSubmit: (code: string) => void;
};
const CodeInput: React.FC<Props> = ({onSubmit}) => {
  const [code, setCode] = useState<string>('76561199008462834');

  return (
    <div>
      <p className="">
        스팀 코드를 넣어주세요
      </p>
      <input type="text" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} />
      <button type="submit" className="btn btn-primary" onClick={() => onSubmit(code)}>검색</button>
    </div>
  );
};

export default CodeInput;
