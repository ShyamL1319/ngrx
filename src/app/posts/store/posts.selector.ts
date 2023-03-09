import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { postAdapter, PostState } from "./posts.state";

export const POST_STATE_NAME = 'posts';
const getPostsState = createFeatureSelector<PostState>(POST_STATE_NAME);

export const postSelectors = postAdapter.getSelectors();
export const getPosts = createSelector(getPostsState, postSelectors.selectAll);

export const getPostsEntities = createSelector(getPostsState, postSelectors.selectEntities);

export const getPostById = createSelector(
    getPostsEntities,
    getCurrentRoute,
    (posts, router: RouterStateUrl) => { 
        return posts ?  posts[router.params['id']] : null;
    }
)

export const getPostCount = createSelector(getPostsState, state => state.count )