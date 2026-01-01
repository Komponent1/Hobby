import React, { useState } from 'react';
import { Button } from '@seolim/designsystem';
import Title from './seolim-ui.component.title';
import Description from './seolim-ui.component.description';
import CodeBox from './seolim-ui.component.codeBox';

type UiBoxProps = {
  title: string;
  description?: string;
  additionalDescription?: React.ReactNode;
  children?: React.ReactNode;
  codeContent?: string;
};
const UiBox: React.FC<UiBoxProps> = ({
  title, description, additionalDescription, children, codeContent,
}) => {
  const [showCode, setShowCode] = useState<boolean>(false);
  return (
    <div>
      <div className="mb-4">
        <Title text={title} />
        <Description text={description || ''} />
        {additionalDescription}
      </div>
      <div className="border-black/10 rounded-2xl overflow-hidden border-2">
        <div className="px-4 pb-4">
          {children}
        </div>
        <div className="bg-gray-200 p-2">
          <Button variant="solid" size="sm" onClick={() => setShowCode(!showCode)} content={showCode ? '코드 숨기기' : '코드 보기'} />
        </div>
        {showCode && (
        <CodeBox>
          {codeContent}
        </CodeBox>
        )}
      </div>
    </div>
  );
};
export default UiBox;
