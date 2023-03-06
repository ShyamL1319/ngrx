import { createReducer, on } from "@ngrx/store";
import { addPost, updatePost } from "./posts.actions";
import { initialState } from "./posts.state";

const _postReducer = createReducer(initialState,
    on(addPost, (state, action) => { 
        let post = { ...action.post };
        post.id = (state.posts.length+1).toString()
        return {
            ...state,
            posts:[...state.posts, post]
        }
    }),
    on(updatePost, (state, action) => { 
        let updated_post = { ...action.post };
        const posts = state.posts.map(post => {
            if (post.id === updated_post.id) {
                return { ...updated_post };
            } else { 
                return post;
            } 
        });
        return {
            ...state,
            posts:posts
        }
    })
)


export function postReducer(state:any, action:any) { 
    return _postReducer(state, action);
}