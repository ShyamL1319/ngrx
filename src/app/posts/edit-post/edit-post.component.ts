import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
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
  id: string;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private postService: PostsService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm();
    // this.postSubcription =
    //   this.store.select(getPostById)
    //     .subscribe(
    //       (post) => {
    //         this.post = post;
    //         if (post) {
    //           this.postForm.patchValue({
    //             title: post.title,
    //             description: post.description,
    //           })
    //         }
    //       });
    this.id = this.route.snapshot.params['id'];
    this.postService.entities$.subscribe(posts => {
      const post = posts.find(post => post.id === this.id);
      if (post) {
        this.postForm.patchValue({
          title: post.title,
          description: post.description,
        })
      }      
    })
  }

  onUpdatePost() {
    if (this.postForm.invalid) return;
    const post: Post = {
      id:this.id,
      title: this.postForm.value.title,
      description: this.postForm.value.description
    }
    //this.store.dispatch(updatePost({post}));
    this.postService.update(post);
    this.router.navigate(['/posts'])
  }

  createForm() { 
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)])
    })
  }


  ngOnDestroy(): void {
    if(this.postSubcription)
      this.postSubcription.unsubscribe();
  }
}
