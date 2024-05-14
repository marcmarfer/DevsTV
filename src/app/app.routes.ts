import { Routes } from '@angular/router';
import { BookmarksComponent } from './components/main/bookmarks/bookmarks.component';
import { VideosComponent } from './components/main/videos/videos.component';
import { AdminComponent } from './components/main/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: '', component: VideosComponent },
    { path: 'videos', component: VideosComponent },
    { path: 'bookmarks', component: BookmarksComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }
];
