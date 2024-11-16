import React, { useState, useEffect, useRef, useCallback } from 'react';
import SearchInput from '../../components/common/SearchInput';
import PlaceList from '../../components/common/PlaceList';
import { PlaceListInfo } from '../../types/placelist';
import { dummyPlaceList } from '../../data/tempPlaceListdata';
import '../../styles/place/PlacePage.scss';
import { getDefaultPlaceList, getSearchPlaceList } from '../../api/placelist';
import { defaultPostReq } from '../../types/place';
import RegionMap from '../../components/common/RegionMap';
import UpBtn from '../../components/common/UpBtn';

type SortType = 'star' | 'default' | undefined;

const PlacePage: React.FC = () => {
  const [places, setPlaces] = useState<PlaceListInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);

  const observer = useRef<IntersectionObserver>();
  const headerTitleRef = useRef<HTMLDivElement>(null);

  const lastPlaceRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  // 데이터 페칭 로직
  const fetchPlaces = useCallback(
    async (
      searchTerm: string,
      searchCategory: string,
      sortType: SortType,
      pageNum: number,
      isNewSearch: boolean
    ) => {
      try {
        setIsLoading(true);

        if (searchTerm) {
          const reqData: defaultPostReq = {
            keyword: searchTerm,
            category: searchCategory,
            sort: sortType,
            page: pageNum - 1,
          };

          console.log('Search request data:', reqData);

          const response = await getSearchPlaceList(reqData);
          const newPlaces = response.data.content;

          console.log('newPlace >>', newPlaces);

          setPlaces((prev) =>
            isNewSearch ? newPlaces : [...prev, ...newPlaces]
          );
          setHasMore(newPlaces.length === 6);
        } else {
          const result = await getDefaultPlaceList(pageNum - 1, 6);
          const newPlaces = result.data.content;

          console.log('newPlace >>>', newPlaces);

          setPlaces((prev) =>
            isNewSearch ? newPlaces : [...prev, ...newPlaces]
          );
          setHasMore(newPlaces.length === 6);
        }
      } catch (error) {
        console.error('데이터 로딩 중 에러:', error);
        if (isNewSearch) setPlaces(dummyPlaceList);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // 초기 데이터 로딩
  useEffect(() => {
    if (isInitialMount.current) {
      fetchPlaces('', '', undefined, 1, true);
      isInitialMount.current = false;
    }
  }, [fetchPlaces]);

  // 페이지 변경시 추가 데이터 로딩
  useEffect(() => {
    if (!isInitialMount.current && page > 1) {
      fetchPlaces(currentSearchTerm, category, sortBy, page, false);
    }
  }, [page, currentSearchTerm, sortBy, category, fetchPlaces]);

  const handleSearch = async (
    searchTerm: string,
    searchCategory: string,
    sortType?: SortType
  ) => {
    setIsSearching(true);
    setCurrentSearchTerm(searchTerm);
    setCategory(searchCategory);
    setSortBy(sortType);
    setPage(1); // 검색 시 페이지 초기화를 먼저 하고
    setPlaces([]); // 기존 검색 결과도 초기화

    await fetchPlaces(searchTerm, searchCategory, sortType, 1, true);
    setPage(1);

    if (headerTitleRef.current) {
      headerTitleRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    setIsSearching(false);
  };

  const handleDistrictClick = (district: string) => {
    setSelectedDistrict(district);
    handleSearch(district === '서울' ? 'seoul' : district, 'address', sortBy);
  };

  const handleSort = (type: SortType) => {
    setIsDropdownOpen(false);
    handleSearch(currentSearchTerm, category, type);
  };

  return (
    <div className="place-page">
      <strong className="page-banner-txt">
        이곳저곳의 핫플레이스를 찾아보세요!
      </strong>
      <div className="place-map-container tutorial-map-container">
        <RegionMap
          onDistrictClick={handleDistrictClick}
          selectedDistrict={selectedDistrict}
        />
      </div>
      <div className="place-search tutorial-search">
        <SearchInput
          placeholder="장소 검색하기"
          onSearch={(searchTerm) => handleSearch(searchTerm, 'title', sortBy)}
          isLoading={isSearching}
        />
      </div>
      <div className="place-header" ref={headerTitleRef}>
        <div className="place-header-title">
          장소 검색
          {currentSearchTerm && (
            <span className="place-header-result">
              '{currentSearchTerm === 'seoul' ? '서울' : currentSearchTerm}' 에
              대한 검색 결과
            </span>
          )}
        </div>
        <div className="place-header-filter">
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {sortBy === 'star'
                ? '평점순'
                : sortBy === 'default'
                ? '기본순'
                : '필터보기'}
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => handleSort('star')}>평점순</button>
                <button onClick={() => handleSort('default')}>기본순</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />
      {isSearching ? (
        <div className="place-search-status">검색 중...</div>
      ) : places.length > 0 ? (
        <div className="place-list-item tutorial-list">
          {places.map((place, index) => (
            <div
              className="place-list-item-page"
              // key={place.placeId}
              key={place.placeId + '-' + index}
              ref={index === places.length - 1 ? lastPlaceRef : null}
            >
              <PlaceList
                placeId={place.placeId}
                placeName={place.placeName}
                placeCtgName={place.placeCtgName}
                averageStar={place.averageStar}
                paid={place.paid}
                placeImg={place.placeImg}
                totalReviewCount={place.totalReviewCount}
              />
            </div>
          ))}
          {isLoading && <div className="place-search-status">로딩 중...</div>}
        </div>
      ) : (
        <div className="place-list-404">
          {currentSearchTerm
            ? `'${currentSearchTerm}' 에 대한 검색 결과가 없습니다.`
            : '검색 결과가 없습니다.'}
        </div>
      )}
      <UpBtn />
    </div>
  );
};

export default PlacePage;
