export interface LoginFormInputs {
  loginId: string;
  userPw: string;
}

export interface RegisterFormInputs {
  loginId: string;
  userPw: string;
  pwCheck: string;
  nickname: string;
  email: string;
  phoneNum: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

export interface ReviewProps {
  reviewId: number;
  reviewContent: string;
  star: number;
  createdAt: string;
  likeCount: number;
  placeId: number;
  placeName: string;
}

export interface MyInfoProps {
  userInfo: {
    userId: string | null;
    profileImg?: string;
    nickname?: string;
  } | null;
}

export interface EditUserFormProps {
  userPw?: string;
  pwCheck?: string;
  phoneNum?: string;
}
