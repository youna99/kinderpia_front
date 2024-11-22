import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// 타입 호출
import { PlaceData, ratingAndCategory } from '../../types/place';
import ReviewInput from '../../components/review/ReviewInput';
import ReviewList from '../../components/review/ReviewList';
import PlaceInfoDetail from '../../components/place/PlaceInfoDetail';
import { getPlace } from '../../api/placelist';

import '../../styles/place/PlaceDetailPage.scss';
import UpBtn from '../../components/common/UpBtn';

const PlaceDetailPage: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [placeDetail, setPlaceDetail] = useState<PlaceData>();
  const [ratingAndCategorys, setRatingAndCategorys] =
    useState<ratingAndCategory>();
  const [reviewcreate, setReviewcreate] = useState<boolean>(false); // 리뷰작성완료상태
  const [reviewdelete, setReviewdelete] = useState<boolean>(false); // 리뷰삭제완료상태

  const handleReviewSubmit = () => {
    setReviewcreate((prev) => !prev); // 리뷰가 제출되면 상태를 변경
  };

  const handleReviewDelete = (reviewId: number) => {
    setReviewdelete((prev) => !prev); // 리뷰가 삭제되면 상태를 변경
  };

  // GET) 장소상세데이터 가져오기
  const getPlaceDetail = async () => {
    try {
      const data = await getPlace(placeId);
      if (!data) {
        return;
      }

      setPlaceDetail(data.data);
      setRatingAndCategorys(data.data);
    } catch (error) {
      console.log('장소목록 가져오는 중 에러 발생!: ', error);
    }
  };

  useEffect(() => {
    if (!placeId) return;
    setIsLoading(true);
    try {
      getPlaceDetail();
    } catch (error) {
      console.error('Error fetching place data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [placeId, reviewcreate, reviewdelete]);

  if (!placeId) {
    return <div>낫 타당한 접근방법! </div>;
  }

  if (isLoading) {
    return <div>로딩중이여요!</div>;
  }

  if (!placeDetail) {
    return null;
  }

  return (
    <section className="place-detail-page">
      <div className="place-detail-info">
        {placeDetail && ratingAndCategorys ? (
          <PlaceInfoDetail
            data={placeDetail}
            ratingAndCategory={ratingAndCategorys}
          />
        ) : (
          <div>로딩중입니다...</div>
        )}
      </div>
      <ReviewInput placeId={placeId} onReviewSubmit={handleReviewSubmit} />
      <ReviewList
        placeId={placeId}
        reviewcreate={reviewcreate}
        onDelete={handleReviewDelete}
        reviewdelete={reviewdelete}
      />
      <UpBtn />
    </section>
  );
};

export default PlaceDetailPage;
