import { Post } from "src/app/models/post.model"
import { createEntityAdapter, EntityState } from "@ngrx/entity"

export interface PostState extends EntityState<Post> { }

export const postAdapter = createEntityAdapter<Post>();

export const initialState : PostState = postAdapter.getInitialState()