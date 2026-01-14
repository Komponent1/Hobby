import { Input } from "@seolim/designsystem";
import React, { KeyboardEventHandler, useCallback, useState } from "react";

type Props = {
  search: (text: string) => void;
};
const SearchInput: React.FC<Props> = ({ search }) => {
  const [text, setText] = useState<string>("");
  const onKeyDown: KeyboardEventHandler = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        search(text);
      }
    },
    [search, text]
  );
  return (
    <form>
      <div className="flex">
        <Input
          value={text}
          onChange={setText}
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력하세요"
          withSubmitButton
          onClickSubmitButton={() => search(text)}
        />
      </div>
    </form>
  );
};
export default SearchInput;
