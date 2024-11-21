import { env } from '$env/dynamic/public';
import { createShihai } from '@shihai/client';

export const shihai = createShihai({
	url: env.PUBLIC_API_URL
});
