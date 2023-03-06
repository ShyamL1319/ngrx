import { Login } from "src/app/models/auth.model";
export interface AuthState{
    email: string;
    password: string;
}
export const initialState: AuthState = {
    email: '',
    password:'',
}