export type OTPInput = {
  otp: string;
  userId: string;
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

export type User = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  active: boolean;
};

export type Media = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  key: string;
  testimonialId: string;
};

export type Testimonial = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  quote?: string;
  quotedBy?: string;
  designation?: string;
  media: Media;
  active: boolean;
};

export type PromotionaryArticle = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  priority: number;
  title: string;
  content: string;
  whatsAppLink: string;
  instagramLink: string;
  contact: string;
  media: Media;
  setAsBanner: boolean;
  active: boolean;
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
