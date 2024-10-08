
const server = process.env.EXPO_PUBLIC_SERVER || "http://localhost:8080";

export const apiRoutes = {
    "login": `${server}/auth/login`,
    "register": `${server}/auth/register`,
} as const;

export type ApiRoutes = typeof apiRoutes;
export type ApiRoute = keyof ApiRoutes;