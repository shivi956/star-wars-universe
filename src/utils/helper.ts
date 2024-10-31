export const getUrlKey = (url: string) => url.split('/').filter(Boolean).slice(-1)[0];
