import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostlistComponent } from "./postlist/postlist.component";

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
        ReactiveFormsModule
    ]
})
export class PostsModuls { }