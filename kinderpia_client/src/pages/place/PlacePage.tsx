import React, { useState, useEffect, useRef, useCallback } from 'react';

// 컴포넌트 호출
import SearchInput from '../../components/common/SearchInput';
import PlaceList from '../../components/common/PlaceList';
import SeoulMap from '../../assets/seoulMap';

// 타입 호출
import { PlaceListInfo } from '../../types/placelist';

// 데이터 호출 - 더미데이터 , API 호출
import { dummyPlaceList } from '../../data/tempPlaceListdata';

// 스타일 scss 호출
import '../../styles/place/PlacePage.scss';
import { getDefaultPlaceList, getSearchPlaceList } from '../../api/placelist';
import { defaultPostReq } from '../../types/place';

// interface SearchResponse {
//   places: PlaceListInfo[];
//   total: number;
// }

type SortType = 'rating' | 'time' | null;

const PlacePage: React.FC = () => {
  const [places, setPlaces] = useState<PlaceListInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>(null);
  
  // 무한 스크롤을 위한 상태 추가
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver>();
  // const lastPlaceElementRef = useRef<HTMLDivElement>(null);

  // meeting-header-title 요소를 참조할 ref 생성
  const headerTitleRef = useRef<HTMLDivElement>(null);

  // 무한 스크롤 observer 설정
  const lastPlaceRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  // 초기 데이터 로딩
  useEffect(() => {
    const fetchDefaultPlaces = async () => {
      try {
        setIsLoading(true);
        const result = await getDefaultPlaceList(1, 6);
        if (result) {
          setPlaces(result.data.content);
          setHasMore(result.data.content.length === 6); // 6개 미만이면 더 이상 데이터가 없음
        } else {
          setPlaces(dummyPlaceList);
          setHasMore(false);
        }
      } catch (error) {
        console.error('장소 목록 로딩 중 에러:', error);
        setPlaces(dummyPlaceList);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDefaultPlaces();
  }, []);

  // 페이지 변경시 추가 데이터 로딩
  useEffect(() => {
    if (page === 1) return; // 초기 로딩은 제외

    const fetchMorePlaces = async () => {
      try {
        setIsLoading(true);
        if (currentSearchTerm) {
          const reqData: defaultPostReq = {
            keyword: currentSearchTerm,
          };
          const response = await getSearchPlaceList(reqData);
          const newPlaces = response.data.content;
          setPlaces((prev) => [...prev, ...newPlaces]);
          setHasMore(newPlaces.length === 6);
        } else {
          const result = await getDefaultPlaceList(page, 6);
          const newPlaces = result.data.content;
          setPlaces((prev) => [...prev, ...newPlaces]);
          setHasMore(newPlaces.length === 6);
        }
      } catch (error) {
        console.error('추가 데이터 로딩 중 에러:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMorePlaces();
  }, [page, currentSearchTerm, sortBy]);

  // 검색 함수
  const handleSearch = async (
    searchTerm: string,
    category: string,
    sort?: SortType
  ) => {
    setIsSearching(true);
    setCurrentSearchTerm(searchTerm);
    setPage(1); // 검색 시 페이지 초기화

    try {
      const reqData: defaultPostReq = {
        category: category,
        keyword: searchTerm,
      };

      console.log('reqData>>>', reqData);

      const response = await getSearchPlaceList(reqData);
      console.log('response >>>', response.data.content);

      setPlaces(response.data.content); // 검색 시 기존 데이터 초기화
      setHasMore(response.data.content.length === 6);

      console.log('headerTitleRef.current', headerTitleRef.current);

      // 검색 후 meeting-header-title 요소로 포커스 이동
      if (headerTitleRef.current) {
        headerTitleRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // 지역 선택 핸들러
  const handleDistrictClick = (district: string) => {
    setSelectedDistrict(district);
    handleSearch(district, 'address', sortBy);
  };

  // 정렬 핸들러
  const handleSort = (type: SortType) => {
    setSortBy(type);
    setIsDropdownOpen(false);
    handleSearch(currentSearchTerm, 'title', type);
  };

  return (
    <div className="meeting-page">
      <div className="meeting-map-container">
        <SeoulMap
          onDistrictClick={handleDistrictClick}
          selectedDistrict={selectedDistrict}
        />
      </div>
      <div className="meeting-search">
        <SearchInput
          placeholder="장소 검색하기"
          onSearch={(searchTerm) => handleSearch(searchTerm, 'title', sortBy)}
          isLoading={isSearching}
        />
      </div>
      <div className="meeting-header" ref={headerTitleRef}>
        <div className="meeting-header-title">
          장소 검색
          {currentSearchTerm && (
            <span className="meeting-header-result">
              '{currentSearchTerm}' 에 대한 검색 결과
            </span>
          )}
        </div>
        <div className="meeting-header-filter">
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {sortBy === 'rating'
                ? '평점순'
                : sortBy === 'time'
                ? '시간순'
                : '필터보기'}
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => handleSort('rating')}>평점순</button>
                <button onClick={() => handleSort('time')}>시간순</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />
      {isSearching ? (
        <div className="meeting-search-status">검색 중...</div>
      ) : places.length > 0 ? (
        <div className="meeting-list-item">
          {places.map((place, index) => (
            <div
              className="meeting-list-item-page"
              key={place.placeId}
              ref={index === places.length - 1 ? lastPlaceRef : null}
            >
              <PlaceList
                placeId={place.placeId}
                placeName={place.placeName}
                placeCategoryName={
                  place.placeCategoryName || place.placeCtgName
                }
                rating={place.rating}
                paid={place.paid}
                placeImg={place.placeImg}
              />
            </div>
          ))}
          {isLoading && <div className="meeting-search-status">로딩 중...</div>}
        </div>
      ) : (
        <div className="meeting-list-404">
          {currentSearchTerm
            ? `'${currentSearchTerm}' 에 대한 검색 결과가 없습니다.`
            : '검색 결과가 없습니다.'}
        </div>
      )}
    </div>
  );
};

export default PlacePage;
