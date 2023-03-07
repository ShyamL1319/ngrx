import { createReducer, on } from "@ngrx/store";
import { addPostSuccess, deletePost, loadPostsSuccess, updatePost } from "./posts.actions";
import { initialState } from "./posts.state";

const _postReducer = createReducer(initialState,
    on(addPostSuccess, (state, action) => {
        let post = { ...action.post };
        return { ...state, posts: [...state.posts, post] }
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
        return { ...state, posts: posts }
    }),
    on(deletePost, (state, action) => {
        let afterDeletingPosts = state.posts.filter(post => post.id !== action.id)
        return { ...state, posts:[...afterDeletingPosts] }
    }),
    on(loadPostsSuccess, (state, action) => { 
        return {
            ...state,
            posts:action.posts
        }
    }),
)


export function postReducer(state:any, action:any) { 
    return _postReducer(state, action);
}