export type OTPInput = {
  otp: string;
  userId: string;
};

export type User = {
  id: number;
  email: string;
  verified: boolean;
};

export type Category = {
  id: number;
  name: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Tag = {
  id: number;
  name: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type APIErrorResponse = {
  data: {
    success: boolean;
    message: string;
  };
};

export type OTPErrorResponse = {
  data: {
    success: boolean;
    userId: string;
    message: string;
  };
};
