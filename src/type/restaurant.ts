import { number } from "yup";

export interface IRestaurant {
  id?: string;
  name: string;
  image: string;
  address: string;
  lat: number;
  lng: number;
  category: string[];
  price: {
    min: number;
    max: number;
  };
  time: {
    open: string;
    close: string;
  };
}
export interface IComment {
  id?: string;
  resId: string;
  userId: string;
  comment: ICommentForm;
}
export interface IRateComment {
  id: string;
  commentId: string;
  userId: string;
}

export interface ICommentForm {
  title: string;
  content: string;
  avgRating: number;
  imageUrl: string;
  imageName: string;
  timestamp: Date;
}

export interface IRating {
  location: number;
  price: number;
  quality: number;
  service: number;
  space: number;
}

export enum EResStatus {
  OPEN = "1",
  CLOSE = "0",
}
