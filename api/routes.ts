
const server = process.env.EXPO_PUBLIC_SERVER || "http://localhost:8080";
export const apiRoutes = {
    "login": () => `${server}/auth/login`,
    "register": () => `${server}/auth/register`,
    "note/[id]": (id: string) => `${server}/note/${id}`,
};


export type ApiRoutes = typeof apiRoutes;
export type ApiRoute = keyof ApiRoutes;


export type ApiRouteParams<T extends ApiRoute> = Parameters<ApiRoutes[T]>;

