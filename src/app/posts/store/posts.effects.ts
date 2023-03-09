import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Update } from "@ngrx/entity";
import { RouterNavigatedAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { filter, map, mergeMap, of, switchMap, take, tap, withLatestFrom } from "rxjs";
import { Post } from "src/app/models/post.model";
import { PostsService } from "src/app/services/posts.service";
import { AppState } from "src/app/store/app.state";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, dummyAction, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.actions";
import { getPosts } from "./posts.selector";

@Injectable()
export class PostsEffects { 
    constructor(
        private postsService: PostsService,
        private action$: Actions,
        private store: Store<AppState>,
        private router:Router
    ) { }
    
    getAllPosts$ = createEffect(() =>
        this.action$.pipe(
            ofType(loadPosts),
            withLatestFrom(this.store.select(getPosts)),
            mergeMap(([action, posts]) => {
                if (!posts.length || posts.length === 1) { 
                return this.postsService.getPosts()
                    .pipe(
                        map(posts => { 
                            return loadPostsSuccess({posts})
                        })
                    );
                }
                return of(dummyAction());
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
                            const updatedPost: Update<Post> = {
                                id: action.post.id,
                                changes: {...action.post}
                            }
                            return updatePostSuccess({ post : updatedPost });
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

    deletePostREdirect$ = createEffect(
    () => this.action$.pipe(
        ofType(deletePostSuccess,updatePostSuccess),
        tap((action) => {                
            this.router.navigate(['/posts']);
        })
    ),
        { dispatch: false });
    
    singlePost$ = createEffect(
        () => this.action$.pipe(
            ofType(ROUTER_NAVIGATION),
            filter((r: RouterNavigatedAction) => { 
                return r.payload.routerState.url.startsWith('/posts/details')
            }),
            map((r: RouterNavigatedAction) => { 
                return r.payload.routerState['params']['id']
            }),
            withLatestFrom(this.store.select(getPosts)),
            switchMap(([id, post]) => { 
                if (!post.length) { 
                return this.postsService.getPostById(id)
                    .pipe(
                        map((post) => { 
                            const postData = [{ ...post, id }];
                            return loadPostsSuccess({posts:postData})
                        })
                    )
                }
                return of(dummyAction());
            })
        )
    )
}
