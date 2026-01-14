import React, { useCallback } from "react";
import { Autocomplete } from "@seolim/designsystem";
import CloseableChip from "./information.components.closeableChip";

type Props = {
  tags: string[];
  onType: (text: string) => void;
  searchTags: string[];
  search: (searchTag: string) => void;
  deleteSearchTags: (closeText: string) => void;
};
const Searchbar: React.FC<Props> = ({
  tags,
  searchTags,
  search,
  deleteSearchTags,
  onType,
}) => {
  const onCloseChips = useCallback(
    (chip: string) => {
      deleteSearchTags(chip);
    },
    [deleteSearchTags]
  );

  return (
    <div className="relative mb-5">
      <Autocomplete
        onSearch={onType}
        onSelect={search}
        suggestions={tags}
        placeholder="검색어를 입력해주세요"
        withSearchButton
      />
      <div className="flex flex-row mt-4 gap-2">
        {searchTags.map((searchTag) => (
          <CloseableChip
            key={searchTag}
            label={searchTag}
            onClose={() => onCloseChips(searchTag)}
          />
        ))}
      </div>
    </div>
  );
};

export default Searchbar;
