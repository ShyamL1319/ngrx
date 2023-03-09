import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { first, map, mergeMap, Observable, of, tap } from "rxjs";
import { PostsService } from "src/app/services/posts.service";

@Injectable()
export class PostsResolver implements Resolve<boolean>{
    constructor(
        private postService:PostsService
    ){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
        // return this.postService.loaded$.pipe(
        //     mergeMap(loaded => {
        //         if (loaded) {
        //             return of(true);
        //         }
        //         return this.postService.getAll().pipe(
        //             map((posts) => {
        //                 return !!posts;
        //             })
        //         )
        //     }),
        //     first()
        // )
        return this.postService.loaded$.pipe(
            tap(
                loaded => { 
                    if (!loaded) {
                        this.postService.getAll()
                    }
                }
            ),
            first()
        )
    }

}