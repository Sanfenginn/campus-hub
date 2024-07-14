export interface JwtPayload {
  account: string;
  sub: number;
  role: {
    userType: string;
    userRole: string;
  };
}
