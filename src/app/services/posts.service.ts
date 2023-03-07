import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }
  
  getPosts():Observable<Post[]> { 
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

  addPost(post: Post): Observable<{name:string}> {
    return this.http.post<{name:string}>(`https://myprojectdemo-2f5f5-default-rtdb.firebaseio.com/posts.json`, {...post})
   }
}

