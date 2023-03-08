import { createReducer, on } from "@ngrx/store";
import { addPostSuccess, deletePostSuccess, loadPostsSuccess, updatePostSuccess } from "./posts.actions";
import { initialState, postAdapter } from "./posts.state";

const _postReducer = createReducer(initialState,
    on(addPostSuccess, (state, action) => {
        return postAdapter.addOne(action.post, state);
    }),
    on(updatePostSuccess, (state, action) => {
        return postAdapter.updateOne(action.post, state)
    }),
    on(deletePostSuccess, (state, action) => {
        return postAdapter.removeOne(action.id, state);
    }),
    on(loadPostsSuccess, (state, action) => { 
        return postAdapter.setAll(action.posts, state);
    }),
)


export function postReducer(state:any, action:any) { 
    return _postReducer(state, action);
}