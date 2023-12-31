import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import userReducer from "./features/userSlice";
import { categoryApi } from "./api/categoryApi";
import { tagApi } from "./api/tagApi";
import { testimonialApi } from "./api/testimonialApi";
import { fileUploadApi } from "./api/fileUploadApi";
import { promotionaryArticleApi } from "./api/promotionaryArticleApi";
import { articleApi } from "./api/articleApi";
import { articleSectionApi } from "./api/articleSectionApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [fileUploadApi.reducerPath]: fileUploadApi.reducer,
    [testimonialApi.reducerPath]: testimonialApi.reducer,
    [promotionaryArticleApi.reducerPath]: promotionaryArticleApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
    [articleSectionApi.reducerPath]: articleSectionApi.reducer,
    userState: userReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      userApi.middleware,
      categoryApi.middleware,
      tagApi.middleware,
      fileUploadApi.middleware,
      testimonialApi.middleware,
      promotionaryArticleApi.middleware,
      articleApi.middleware,
      articleSectionApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
