import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { map, Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends EntityCollectionServiceBase<Post>{

  constructor(private http: HttpClient, private serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Post', serviceElementFactory);
   }
  
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
    return this.http.post<{name:string}>(`https://myprojectdemo-2f5f5-default-rtdb.firebaseio.com/posts.json`, post)
  }
  
  updatePost(post: Post): Observable<any> { 
    const postData = {
      [post.id]: {title:post.title, description:post.description}
    }
    return this.http.patch<any>(`https://myprojectdemo-2f5f5-default-rtdb.firebaseio.com/posts.json`,postData)
  }

  deletePost(id: string) {
    return this.http.delete(`https://myprojectdemo-2f5f5-default-rtdb.firebaseio.com/posts/${id}.json`);
  }
  getPostById(id: string):Observable<Post> { 
    return this.http.get<Post>(`https://myprojectdemo-2f5f5-default-rtdb.firebaseio.com/posts/${id}.json`);
  }
}

