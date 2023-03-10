import { createReducer, on } from "@ngrx/store";
import { addPostSuccess, deletePostSuccess, loadPostsSuccess, updatePostSuccess } from "./posts.actions";
import { initialState, postAdapter } from "./posts.state";

const _postReducer = createReducer(initialState,
    on(addPostSuccess, (state, action) => {
        return postAdapter.addOne(action.post, { ...state, count:state.count +1 });
    }),
    on(updatePostSuccess, (state, action) => {
        return postAdapter.updateOne(action.post,state)
    }),
    on(deletePostSuccess, (state, action) => {
        const entity = state.entities[action.id];
        const updatedCount = entity ? state.count - 1 : state.count; 
        return postAdapter.removeOne(action.id, { ...state, count:updatedCount });
    }),
    on(loadPostsSuccess, (state, action) => { 
        return postAdapter.setAll(action.posts, { ...state, count: action.posts.length});
    }),
)


export function postReducer(state:any, action:any) { 
    return _postReducer(state, action);
}