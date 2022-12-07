export type UserLoginSuccess = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expired_in: string;
  refresh_token_expired_in: string;
};

export type RefreshTokenSuccess = {
  access_token: string;
  token_type: string;
  expired_in: number;
};

