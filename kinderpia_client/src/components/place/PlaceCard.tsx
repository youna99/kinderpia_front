import React from 'react'
interface PlaceCardProps{
  id : number;
  title: string;
  category: string;
  location: string;
  latitute :number;
  longitute :number;
  description: string;
  img : string;
  payment : string;
  openTime : string;
  webPageUrl : string;
  phone : string;
  onClick: (value: string) => void;
}


const PlaceCard: React.FC<PlaceCardProps> = ({
  id,
  title,
  category,
  location,
  latitute,
  longitute,
  description,
  img,
  payment,
  openTime,
  webPageUrl,
  phone,
  onClick
}) => {
  return (
    <div>PlaceCard</div>
  )
}

export default PlaceCard