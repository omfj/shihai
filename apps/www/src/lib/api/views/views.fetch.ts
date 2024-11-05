import { api } from '../client';
import type { ViewIncrement, ViewCount } from './views.types';

export const getViews = async (id: string) => {
	return await api
		.get(`views/${id}`)
		.json<ViewCount>()
		.then((data) => data.views);
};

export const incrementViews = async (id: string) => {
	return await api.post(`views/${id}`).json<ViewIncrement>();
};
