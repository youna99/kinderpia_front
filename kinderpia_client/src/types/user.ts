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
