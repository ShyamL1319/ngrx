import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../store/posts.selector';

@Component({
  selector: 'app-signgle-post',
  templateUrl: './signgle-post.component.html',
  styleUrls: ['./signgle-post.component.scss']
})
export class SignglePostComponent implements OnInit {
  post$: Observable<Post>;
  constructor(
    private store:Store<AppState>
  ) { }

  ngOnInit(): void {
    this.post$ = this.store.select(getPostById);
  }

}
