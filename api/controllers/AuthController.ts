import { LoginRequest, LoginResponse, LoginResponseSchema } from "../../types/api/Login"
import { RegisterRequest, RegisterResponse, RegisterResponseSchema } from "@/types/api/Register";
import { apiRoutes } from "../routes"
import { superFetch, SuperFetchError, superXMLHTTPRequest } from "./superFetch";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDefaultStore } from "jotai";
import { userAtom } from "@/utils/atoms/userAtom";

const store = getDefaultStore();
store.sub(userAtom, () => {
    console.log("userAtom changed");
});

export default class AuthController {
    static async login(payload: LoginRequest): Promise<LoginResponse> {
        try {
            const result = await superFetch<LoginRequest, LoginResponse>({
                method: 'POST',
                includeCredentials: false,
            }, "login", LoginResponseSchema, payload);

            // save token to async storage
            await AsyncStorage.setItem('token', result.token);

            store.set(userAtom, result.user)

            return result;
        }
        catch (error) {
            const sfError = error as SuperFetchError;
            console.log(sfError.code);
            if (sfError.code === 401 || sfError.code === 400) {
                throw new Error("Email o contraseña incorrectos");
            }
            throw new Error("Falló el inicio de sesión");
        }
    }

    static async register(payload: RegisterRequest): Promise<RegisterResponse> {
        try {
            const res = await superFetch<RegisterRequest, RegisterResponse>({
                method: 'POST',
            }, "register", RegisterResponseSchema, payload);

            // save token to async storage
            await AsyncStorage.setItem('token', res.token);

            store.set(userAtom, res.user)

            return res;

        }
        catch (error) {
            console.log(error);
            throw new Error("Register failed");
        }
    }
}