import { counterReducer } from "../counter/store/counter.reducers";
import { CounterState } from "../counter/store/counter.state";
import { postReducer } from "../posts/store/posts.reducer";
import { PostState } from "../posts/store/posts.state";

export interface AppState { 
    counter: CounterState;
    posts: PostState;
}


export const appReducer = {
    counter: counterReducer,
    posts:postReducer
}