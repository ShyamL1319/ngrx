import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { distinct, distinctUntilKeyChanged, first, map, mergeMap, Observable, of, switchMap, take } from "rxjs";
import { PostsService } from "src/app/services/posts.service";
import { AppState } from "src/app/store/app.state";
import { setLoading } from "src/app/store/shared/shared.actions";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.actions";

@Injectable()
export class PostsEffects { 
    constructor(private postsService: PostsService, private action$:Actions, private store:Store<AppState>) { }
    
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
            take(1),
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
}
