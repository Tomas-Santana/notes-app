import z from 'zod';
import { ApiRoute, apiRoutes } from '../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SuperFetchOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    includeCredentials?: boolean;
}

export async function superFetch<Request, Response>(
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
        }
        else {
            throw new Error("No token found");
        }
    }

    console.log("fetching", apiRoutes[route]);
    const response = await fetch(apiRoutes[route], {
        method: options.method,
        headers: {
            "Content-Type": "application/json",
        },
        body: payload ? JSON.stringify(payload) : undefined,
        credentials: options.includeCredentials ? 'include' : 'omit',
    });

    if (response.ok) {
        const data = await response.json();
        try {
            return responseSchema.parse(data);
        } catch (error) {
            throw new Error("Unexpected response");
        }
    } else {
        const data = await response.json();
        console.log(data);
        throw new Error("Request failed");
    }
}