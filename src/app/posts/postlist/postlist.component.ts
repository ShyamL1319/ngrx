import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, first, last, Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { AppState } from 'src/app/store/app.state';
import { deletePost, loadPosts } from '../store/posts.actions';
import { getPosts } from '../store/posts.selector';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {
  posts$!: Observable<Post[]>;
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }

  onDeletePost(postId) {
    if (!confirm('Are you sure to delete the post?')) return;
    this.store.dispatch(deletePost({id:postId}))
  }

}
