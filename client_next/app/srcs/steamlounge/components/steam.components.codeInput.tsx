import React, { useState } from 'react';

const CodeInput: React.FC = () => {
  const [code, setCode] = useState<string>('');

  return (
    <div>
      <p className="">
        스팀 코드를 넣어주세요
      </p>
      <input type="text" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} />
      <button className="btn btn-primary" onClick={() => console.log(code)}>검색</button>
    </div>
  );
};

export default CodeInput;
