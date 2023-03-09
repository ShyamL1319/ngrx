import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostlistComponent } from "./postlist/postlist.component";
import { PostsEffects } from "./store/posts.effects";
import { postReducer } from "./store/posts.reducer";
import { POST_STATE_NAME } from "./store/posts.selector";
import { SignglePostComponent } from './signgle-post/signgle-post.component';
import { PostsResolver } from "./resolver/posts..resolver";
import { EntityDataModule, EntityDataService, EntityDefinition, EntityDefinitionService, EntityMetadataMap } from "@ngrx/data";
import { PostsDataService } from "../services/posts-data.service";
import { Post } from "../models/post.model";

const routes: Routes = [
      {
        path: "",
        component: PostlistComponent,
        children: [
            {
                path: "add",
                component: AddPostComponent,
                resolve: { posts: PostsResolver }
            },
            {
                path: "edit/:id",
                component: EditPostComponent,
                resolve: { posts: PostsResolver }
            },
            {
                path: "details/:id",
                component: SignglePostComponent,
                resolve: {posts: PostsResolver}
            },
        ],
        resolve: {posts: PostsResolver}
    },
]

export function sortByName(a:Post, b:Post):number { 
    return a.title.localeCompare(b.title);
}

export function sortById(a:Post, b:Post):number { 
    return a.id.localeCompare(b.id);
} 

export const entityMetadata: EntityMetadataMap = {
    Post: {
        sortComparer: sortByName,
        entityDispatcherOptions: {
            optimisticUpdate: true,
            optimisticDelete: true,
            optimisticAdd: false,
        }
    },
} 
@NgModule({
    declarations: [
        PostlistComponent,
        AddPostComponent,
        EditPostComponent,
        SignglePostComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        // StoreModule.forFeature(POST_STATE_NAME, postReducer),
        // EffectsModule.forFeature([PostsEffects]),
    ],
    providers: [
        PostsDataService,
        PostsResolver
    ]
})
export class PostsModuls {
    constructor(
        eds: EntityDefinitionService,
        entityDataService : EntityDataService,
        postsDataService: PostsDataService,
    ) {
        eds.registerMetadataMap(entityMetadata);
        entityDataService.registerService('Post',postsDataService)
    }
 }