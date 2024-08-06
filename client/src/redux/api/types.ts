export type OTPInput = {
  otp: string;
  userId: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
  active: boolean;
  setAsCategory: boolean;
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
  promotionaryArticleId: string;
  articleId: string;
  articleSectionId: string;
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
  websiteLink: string;
  whatsAppLink: string;
  instagramLink: string;
  address: string;
  contact: string;
  media: Media;
  setAsBanner: boolean;
  active: boolean;
};

export type Article = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  title: string;
  content: string;
  location: string;
  youtubeVideoUrl: string;
  twitterId: string;
  author: string;
  publishedOn: Date;
  state: string;
  setAsBanner: boolean;
  active: boolean;
  postToSocialMedia: boolean;
  media: Media[];
  articleSection: ArticleSection[];
  tag: Tag[];
  category: Category[];
};

export type ArticleSection = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  sequence: number;
  media: Media[];
  articleId: number;
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
