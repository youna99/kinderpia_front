import React, { useState, KeyboardEvent } from 'react';

import '../../styles/meeting/SearchInput.scss';

interface SearchInputProps {
  placeholder: string;
  onSearch: (searchTerm: string) => Promise<void>;
  disabled?: boolean;
  isLoading?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onSearch,
  disabled = false,
  isLoading: externalLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [internalLoading, setInternalLoading] = useState(false);
  const isLoading = externalLoading || internalLoading;

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      setInternalLoading(true);
      await onSearch(searchTerm);
      setSearchTerm(''); // input창 초기화
    } catch (error) {
      console.error('검색 중 오류가 발생했습니다:', error);
    } finally {
      setInternalLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="search-input-box">
      <input
        type="text"
        className="search-input-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        aria-label="검색어 입력"
      />
      <button
        className="search-input-btn"
        onClick={handleSearch}
        disabled={disabled || isLoading || !searchTerm.trim()}
        aria-label="검색"
      >
        {isLoading ? '검색 중...' : '검색'}
      </button>
    </div>
  );
};

export default SearchInput;
