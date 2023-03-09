import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsResolver } from './posts/resolver/posts..resolver';
import { SignglePostComponent } from './posts/signgle-post/signgle-post.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "counter",
    loadChildren: () => import('./counter/counter.module').then(m => m.CounterModule)
  },
  {
    path: "posts",
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsModuls),
    canActivate:[AuthGuard]
  },
  {
    path: 'auth',
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
