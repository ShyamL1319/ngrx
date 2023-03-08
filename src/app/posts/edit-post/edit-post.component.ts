import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, Subscription, take } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { AppState } from 'src/app/store/app.state';
import { updatePost } from '../store/posts.actions';
import { getPostById } from '../store/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post;
  postForm: FormGroup;
  postSubcription: Subscription;
  constructor(private route:ActivatedRoute, private store:Store<AppState>) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      const id = params.get('id');
      this.postSubcription = this.store.select(getPostById, { id }).pipe(take(1)).subscribe((post) => { 
        this.post = post;
        this.createForm();
      })
    })
  }

  onUpdatePost() {
    if (this.postForm.invalid) return;
    const post: Post = {
      id:this.post.id,
      title: this.postForm.value.title,
      description: this.postForm.value.description
    }
    this.store.dispatch(updatePost({post}));
  }

  createForm() { 
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(this.post.description, [Validators.required, Validators.minLength(10)])
    })
  }


  ngOnDestroy(): void {
    if(this.postSubcription)
      this.postSubcription.unsubscribe();
  }
}
