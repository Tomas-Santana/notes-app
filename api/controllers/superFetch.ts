import z from 'zod';
import { ApiRoute, apiRoutes, ApiRouteParams } from '../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class SuperFetchError extends Error {
    code : number;

    constructor(message: string, code: number) {
        super(message);
        this.code = code;
        this.name = "SuperFetchError";
    }
}

interface SuperFetchOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    includeCredentials?: boolean;
}

interface SuperFetchParams<Request, Response, Route extends ApiRoute = ApiRoute> {
    options: SuperFetchOptions;
    route: Route;
    params?: ApiRouteParams<Route>;
    responseSchema: z.ZodType<Response>;
    payload?: Request;
}

export async function superFetch<Request, Response, Route extends ApiRoute = ApiRoute>(
    { options, route, params, responseSchema, payload }: SuperFetchParams<Request, Response, Route>
): Promise<Response> {
    console.log("executing superFetch");

    if (params === undefined) {
        params = [] as ApiRouteParams<Route>;
    }

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    
    
    if (options.includeCredentials) {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        else {
            throw new Error("No token found");
        }
    }

    // @ts-ignore
    const realRoute = apiRoutes[route](...params); 
    console.log("fetching3", realRoute);

    
    const response = await fetch(realRoute, {
        method: options.method,
        headers: headers,
        body: payload ? JSON.stringify(payload) : undefined,
        credentials: options.includeCredentials ? 'include' : 'omit',
    });
    
    if (response.ok) {
        const data = await response.json();
        try {
            return responseSchema.parse(data);
        } catch (error) {
            // if is zod error print the error
            if (error instanceof z.ZodError) {
                console.log(error.errors);
            }

            throw new SuperFetchError("El servidor envió una respuesta inesperada", response.status);
        }
    } else {
        const data = await response.json();
        console.log(data);
        throw new SuperFetchError(data.error ?? "Ocurrió un error", response.status);
        }
    
}

export async function superXMLHTTPRequest<Request, Response>(
    options: SuperFetchOptions, 
    route: ApiRoute, 
    responseSchema: z.ZodType<Response>,
    payload?: Request
): Promise<Response> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    if (options.includeCredentials) {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        } else {
            throw new Error("No token found");
        }
    }

    return new Promise<Response>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // @ts-ignore
        const realRoute = apiRoutes[route](...params); 
        xhr.open(options.method, realRoute, true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        if (options.includeCredentials) {
            xhr.withCredentials = true;
        }

        headers.forEach((value: string, key: string) => {
            xhr.setRequestHeader(key, value);
        });

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    resolve(responseSchema.parse(data));
                } catch (error) {
                    reject(new SuperFetchError("El servidor envió una respuesta inesperada", xhr.status));
                }
            } else {
                try {
                    const data = JSON.parse(xhr.responseText);
                    reject(new SuperFetchError(data.error ?? "Ocurrió un error", xhr.status));
                } catch (error) {
                    reject(new SuperFetchError("Ocurrió un error", xhr.status));
                }
            }
        };

        xhr.onerror = () => {
            reject(new SuperFetchError("Ocurrió un error de red", xhr.status));
        };

        xhr.send(payload ? JSON.stringify(payload) : null);
    });
}