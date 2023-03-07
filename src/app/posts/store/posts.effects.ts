import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { distinct, distinctUntilKeyChanged, first, map, mergeMap, Observable, of, switchMap } from "rxjs";
import { PostsService } from "src/app/services/posts.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.actions";

@Injectable()
export class PostsEffects { 
    constructor(private postsService: PostsService, private action$:Actions) { }
    
    getAllPosts$ = createEffect(() =>
        this.action$.pipe(
            ofType(loadPosts),
            mergeMap((action) => {
                console.log(action);
                return this.postsService.getPosts()
                    .pipe(
                        map(posts => { 
                            return loadPostsSuccess({posts})
                        })
                    );
            })
        )
    )

    addPost$ = createEffect(() => this.action$
        .pipe(
            ofType(addPost),
            switchMap(action => { 
                return this.postsService.addPost(action.post)
                    .pipe(
                        map((data) => { 
                            const post = { ...action.post, id: data.name };
                            return addPostSuccess({ post });
                        })
                    );
            })
        )
    )

    updatePost$ = createEffect(() =>
        this.action$.pipe(
            ofType(updatePost),
            switchMap((action) => { 
                return this.postsService
                    .updatePost(action.post).pipe(
                        map((data) => { 
                            return updatePostSuccess({post:action.post})
                        })
                    );
            })
        )
    )
    delete$ = createEffect(() =>
        this.action$.pipe(
            ofType(deletePost),
            switchMap((action) => {
                return this.postsService
                    .deletePost(action.id).pipe(
                        map((data) => {
                            return deletePostSuccess({ id: action.id })
                        })
                    );
            })
        )
    )
    // TODO:- delete is calling infinitly the deleteAction some how need to resolve
}
