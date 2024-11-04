// MyReviews.tsx
import axios from 'axios';
import React, { useEffect } from 'react';

const MyReviews: React.FC = () => {
  // /api/user/review/list/{userId}?page=1&size=10

  // useEffect(() => {
  //   const getUserReviewList = async () => {
  //     const response = await axios.get(
  //       `http://localhost:8080/api/user/meeting/list/${userId}?page=1&size=10`,
  //       { withCredentials: true }
  //     );
  //   };
  // });
  return (
    <section>
      <h2>나의 리뷰</h2>
      {/* 리뷰를 표시하는 코드 */}
    </section>
  );
};

export default MyReviews;
