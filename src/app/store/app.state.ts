import { authReducer } from "../auth/store/auth.reducer";
import { AuthState } from "../auth/store/auth.state";
import { counterReducer } from "../counter/store/counter.reducers";
import { CounterState } from "../counter/store/counter.state";
import { postReducer } from "../posts/store/posts.reducer";
import { PostState } from "../posts/store/posts.state";

export interface AppState { 
    counter: CounterState;
    posts: PostState;
    auth:AuthState
}


export const appReducer = {
    counter: counterReducer,
    posts: postReducer,
    auth:authReducer
}