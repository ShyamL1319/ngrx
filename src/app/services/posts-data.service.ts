import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Update } from "@ngrx/entity";
import { map, Observable } from "rxjs";
import { Post } from "../models/post.model";

@Injectable()
export class PostsDataService extends DefaultDataService<Post>{
    constructor(
        http: HttpClient,
        httpUrlGenerator:HttpUrlGenerator
    ) {
        super('Post',http,httpUrlGenerator)
    }
    override getAll(): Observable<Post[]> {
        return this.http.get<Post[]>(`https://myprojectdemo-2f5f5-default-rtdb.firebaseio.com/posts.json`)
            .pipe(
                map(data => { 
                    const posts: Post[] = [];
                    for (let key in data) { 
                        if (data[key]) { 
                            posts.push({...data[key], id: key})
                        }
                    }
                    return posts;                    
                })
            )
    }

    override add(post: Post): Observable<Post> {
        return this.http.post<{name:string}>(`https://myprojectdemo-2f5f5-default-rtdb.firebaseio.com/posts.json`, post)
            .pipe(
                map((data) => {
                    return { ...post, id: data.name }
                })
            );
    }

    override update(post: Update<Post>): Observable<Post> {
        return this.http.put<Post>(`https://myprojectdemo-2f5f5-default-rtdb.firebaseio.com/posts/${post.id}.json`, {...post.changes})
    }

    override delete(id: string | number): Observable<any> {
        return this.http.delete<any>(`https://myprojectdemo-2f5f5-default-rtdb.firebaseio.com/posts/${id}.json`)
    }
}