import React, { useState, useEffect, useRef, useCallback } from 'react';
import SearchInput from '../../components/common/SearchInput';
import PlaceList from '../../components/common/PlaceList';
import SeoulMap from '../../assets/seoulMap';
import { PlaceListInfo } from '../../types/placelist';
import { dummyPlaceList } from '../../data/tempPlaceListdata';
import '../../styles/place/PlacePage.scss';
import { getDefaultPlaceList, getSearchPlaceList } from '../../api/placelist';
import { defaultPostReq } from '../../types/place';

type SortType = 'star' | 'default' | undefined;

const PlacePage: React.FC = () => {
  const [places, setPlaces] = useState<PlaceListInfo[]>([]); // 장소 목록
  const [isSearching, setIsSearching] = useState(false); // 검색 중인지 여부
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null); // 지역값
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>(''); // 검색어
  const [category, setCategory] = useState<string>(''); // 카테고리
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 필터 드롭다운
  const [sortBy, setSortBy] = useState<SortType>(); // 평점순, 기본순

  // 무한 스크롤을 위한 상태 추가
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver>();

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
        const result = await getDefaultPlaceList(0, 6);
        if (result) {
          setPlaces(result.data.content);
          console.log('result.data.content >>>', result.data.content);

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
            category: category,
            sort: sortBy,
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
  }, [page, currentSearchTerm, sortBy, category]);

  // 검색 함수
  const handleSearch = async (
    searchTerm: string,
    searchCategory: string,
    sortBy?: SortType
  ) => {
    setIsSearching(true);
    setCurrentSearchTerm(searchTerm);
    setSortBy(sortBy);
    setCategory(searchCategory);
    setPage(0); // 검색 시 페이지 초기화

    try {
      const reqData: defaultPostReq = {
        category: searchCategory,
        keyword: searchTerm,
        sort: sortBy,
      };

      console.log('reqData>>>', reqData);

      const response = await getSearchPlaceList(reqData);
      console.log('response >>>', response.data.content);

      setPlaces(response.data.content); // 검색 시 기존 데이터 초기화
      setHasMore(response.data.content.length === 6);

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
    console.log('type>>>', type);
    setSortBy(type);
    setIsDropdownOpen(false);
    handleSearch(currentSearchTerm, category, type);
  };

  return (
    <div className="place-page">
      <strong className="page-banner-txt">
        서울 이곳저곳의 핫플레이스를 찾아보세요!
      </strong>
      <div className="place-map-container">
        <SeoulMap
          onDistrictClick={handleDistrictClick}
          selectedDistrict={selectedDistrict}
        />
      </div>
      <div className="place-search">
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
              '{currentSearchTerm}' 에 대한 검색 결과
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
        <div className="place-list-item">
          {places.map((place, index) => (
            <div
              className="place-list-item-page"
              key={place.placeId}
              ref={index === places.length - 1 ? lastPlaceRef : null}
            >
              <PlaceList
                placeId={place.placeId}
                placeName={place.placeName}
                placeCtgName={place.placeCtgName}
                averageStar={place.averageStar}
                paid={place.paid}
                placeImg={place.placeImg}
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
    </div>
  );
};

export default PlacePage;
