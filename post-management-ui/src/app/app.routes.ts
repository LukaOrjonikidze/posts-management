import { Routes } from '@angular/router';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { PostComponent } from './pages/post/post.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: PostsPageComponent },
    { path: 'edit/:id', component: PostComponent, data: { type: 'edit' }, canActivate: [authGuard] },
    { path: 'create', component: PostComponent, data: { type: 'create' }, canActivate: [authGuard] },
    { path: 'post/:id', component: PostComponent, data: { type: 'view' } },
    { path: 'register', component: AuthorizationComponent, data: { type: 'register' } },
    { path: 'login', component: AuthorizationComponent, data: { type: 'login' } },
    { path: '**', redirectTo: '' }
];
