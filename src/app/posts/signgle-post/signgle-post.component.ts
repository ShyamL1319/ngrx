import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../store/posts.selector';

@Component({
  selector: 'app-signgle-post',
  templateUrl: './signgle-post.component.html',
  styleUrls: ['./signgle-post.component.scss']
})
export class SignglePostComponent implements OnInit {
  post: Post;
  constructor(
    private store: Store<AppState>,
    private postService: PostsService,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    //this.post$ = this.store.select(getPostById);
    const id = this.route.snapshot.params['id'];
    this.postService.entities$.subscribe(posts => {
      this.post = posts.find(post => post.id === id);
    });
  }

}
