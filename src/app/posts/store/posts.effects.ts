import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, Observable, of } from "rxjs";
import { PostsService } from "src/app/services/posts.service";
import { loadPosts, loadPostsSuccess } from "./posts.actions";

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
}
