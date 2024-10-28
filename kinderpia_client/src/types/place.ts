export interface PlaceData{
  id : number;
  title: string;
  category: string;
  location: string;
  latitute :number;
  longitude :number;
  description: string;
  img : string;
  payment : string;
  openTime : string;
  webPageUrl : string;
  phone : string;
}

export interface ReviewData{
  id : number;
  writer: string;
  content : string;
  star : number;
  createdAt : string;
}