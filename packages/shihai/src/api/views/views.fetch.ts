import type { ViewIncrement, ViewCount } from "./views.types";
import { injectApi } from "../client";

export const getViews = injectApi((api) => async (id: string) => {
  return await api
    .get(`views/${id}`)
    .json<ViewCount>()
    .then((data) => data.views);
});

export const incrementViews = injectApi((api) => async (id: string) => {
  return await api.post(`views/${id}`).json<ViewIncrement>();
});
