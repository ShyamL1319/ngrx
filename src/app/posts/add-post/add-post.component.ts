import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../store/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;
  constructor(
    private store: Store<AppState>,
    private postsService: PostsService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)])
    });
  }


  onAddPost() { 
    if (this.postForm.invalid) return;
    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description
    }
    // this.store.dispatch(addPost({post}));
    this.postsService.add(post).subscribe(
      (data) => {
        this.router.navigate(['/posts'])
      }
    );
  }

}
