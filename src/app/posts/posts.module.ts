import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostlistComponent } from "./postlist/postlist.component";
import { postReducer } from "./store/posts.reducer";
import { POST_STATE_NAME } from "./store/posts.selector";

const routes: Routes = [
      {
        path: "",
        component: PostlistComponent,
        children: [
            { path: "add", component: AddPostComponent },
            { path: "edit/:id", component: EditPostComponent },
        ]
    },
]

@NgModule({
    declarations: [
        PostlistComponent,
        AddPostComponent,
        EditPostComponent        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature(POST_STATE_NAME, postReducer)
    ]
})
export class PostsModuls { }