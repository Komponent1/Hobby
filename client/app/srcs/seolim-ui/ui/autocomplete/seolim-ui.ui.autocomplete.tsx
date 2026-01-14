import React, { useState } from "react";
import { Autocomplete } from "@seolim/designsystem";
import {
  Description,
  UiBox,
  HeadBox,
  Title,
  PropsTable,
} from "../../component";
import { examples, propsTable } from "./seolim-ui.ui.autocomplete.example";

const sampleSuggestions = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Grape",
  "Lemon",
  "Mango",
  "Orange",
  "Peach",
  "Strawberry",
];

const UiAutocomplete: React.FC = () => {
  const [suggestions, setSuggestions] = useState<string[]>(sampleSuggestions);
  const [, setValue] = useState("");

  const handleSearch = (query: string) => {
    setValue(query);
    setSuggestions(
      sampleSuggestions.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleSelect = (selected: string) => {
    setValue(selected);
  };

  return (
    <div className="space-y-6">
      <HeadBox>
        <Title text="Autocomplete" />
        <Description text="입력값에 따라 추천 항목을 보여주는 자동완성 컴포넌트입니다." />
      </HeadBox>

      <div className="space-y-4">
        <Title text="속성" />
        <PropsTable datas={propsTable} />
      </div>

      <UiBox {...examples.basic}>
        <div className="mt-4 h-60">
          <Autocomplete
            onSearch={handleSearch}
            onSelect={handleSelect}
            suggestions={suggestions}
            placeholder="과일을 입력하세요"
          />
        </div>
      </UiBox>

      <UiBox {...examples.withSearchButton}>
        <div className="mt-4 h-60">
          <Autocomplete
            onSearch={handleSearch}
            onSelect={handleSelect}
            suggestions={suggestions}
            placeholder="과일을 입력하세요"
            withSearchButton
          />
        </div>
      </UiBox>
    </div>
  );
};

export default UiAutocomplete;
