
const server = process.env.EXPO_PUBLIC_SERVER || "http://localhost:8080";
export const apiRoutes = {
    "login": () => `${server}/auth/login`,
    "register": () => `${server}/auth/register`,
    "sendReset": () => `${server}/auth/send-reset-email`,
    "resetPassword": () => `${server}/auth/reset-password`,
    "verifyCode": () => `${server}/auth/verify-reset-code`,
    "note/[id]": (id: string) => `${server}/resource/note/${id}`,
    "note": () => `${server}/resource/note`,
    "notes": () => `${server}/resource/notes`,
    "category": () => `${server}/resource/category`,
    "categories": () => `${server}/resource/categories`,
    "category/[id]": (id: string) => `${server}/resource/category/${id}`,
};


export type ApiRoutes = typeof apiRoutes;
export type ApiRoute = keyof ApiRoutes;


export type ApiRouteParams<T extends ApiRoute> = Parameters<ApiRoutes[T]>;

