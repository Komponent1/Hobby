import React from 'react';
import { Form } from "../../common/common.components";

type Props = {
  searchTag: string;
  setSearchTag: (tag: string) => void;
  search: (searchTag: string) => void;
};
const SearchInput: React.FC<Props> = ({
  searchTag, setSearchTag, search,
}) => (
  <Form
    placeholder="검색어를 입력해주세요"
    buttonText="검색"
    labelText="검색어"
    value={searchTag}
    setValue={setSearchTag}
    labelId="searchTag"
    onSubmit={search}
  />
);

export default SearchInput;
