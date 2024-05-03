import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { VideosComponent } from './main/videos/videos.component';
import { AdminComponent } from './main/admin/admin.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'videos', component: VideosComponent },
    { path: 'admin', component: AdminComponent },
    { path: '**', redirectTo: '' }
];
