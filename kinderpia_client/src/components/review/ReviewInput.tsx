import React, { useState, useEffect } from 'react'
interface ReviewInputProps {
  placeId : string;
}

const ReviewInput: React.FC<ReviewInputProps> = ({
  placeId
}) => {
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
    } catch (error) {
      console.error('Error fetching place data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [placeId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!placeId) {
    return <div>No data available</div>;
  }
  return (
    <div>ReviewInput</div>
  )
}

export default ReviewInput