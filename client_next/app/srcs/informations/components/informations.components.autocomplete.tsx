import React, {useCallback, useMemo, useState} from 'react';
import CloseableChip from './information.components.closeableChip';

type Props = {
  tags: string[];
  text: string;
  setText: (text: string) => void;
  searchTags: string[];
  search: (searchTag: string) => void;
  deleteSearchTags: (closeText: string) => void;
};
const Autocomplete: React.FC<Props> = ({
  tags, text, setText, searchTags, search, deleteSearchTags,
}) => {
  const [show, setShow] = useState(false);
  const onFocus = useMemo(() => ({
    in: () => setShow(true),
    out: () => setShow(false),
  }), []);

  const handleClick = useCallback((tag: string) => {
    setShow(false);
    setText('');
    search(tag);
  }, [search, setText]);
  const onCloseChips = useCallback((chip: string) => {
    deleteSearchTags(chip);
  }, [deleteSearchTags]);

  return (
    <div className="relative mb-5">
      <input
        type="text"
        className="w-full p-3 border border-gray-200 dark:border-gray-700 dark:text-gray-400 focus:border-gray-300 dark:focus:border-gray-600 focus:outline-none rounded-md"
        placeholder="검색어를 입력해주세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={onFocus.in}
        onBlur={() => setTimeout(onFocus.out, 200)}
        onSubmit={() => search(text)}
        onKeyDown={(e) => e.key === 'Enter' && handleClick(text)}
      />
      {show && (
        <div className="absolute w-full bg-white border border-gray-200 dark:border-gray-700 dark:text-gray-400 rounded-md shadow-md z-50">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => handleClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
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

export default Autocomplete;
