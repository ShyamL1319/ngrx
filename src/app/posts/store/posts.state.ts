import { Post } from "src/app/models/post.model"
import { createEntityAdapter, EntityState } from "@ngrx/entity"

export interface PostState extends EntityState<Post> {
    count: number;
 }

export const postAdapter = createEntityAdapter<Post>({
    sortComparer : sortById
});

export const initialState: PostState = postAdapter.getInitialState({
    count: 0,
});

export function sortByName(a:Post, b:Post):number { 
    return a.title.localeCompare(b.title);
}

export function sortById(a:Post, b:Post):number { 
    return a.id.localeCompare(b.id);
}