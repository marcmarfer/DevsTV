import { Injectable, signal } from '@angular/core';
import { Video } from '../interfaces/Video';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

export class VideoService {
  videosSignal = signal<Video[]>([]);
  filteredVideosSignal = signal<Video[]>([]);
  filteredVideosByCategorySignal = signal<Video[]>([]);
  bookmarkedVideosSignal = signal<Video[]>([]);

  constructor(private http:HttpClient, private tokenService : TokenService) { this.getVideos() }

  getVideos() {
    this.http.get<Video[]>('http://localhost:3000/videos').subscribe((videos) => {
      this.videosSignal.set(videos);
    })
  }
  
  postVideo(video: Video) {
    let headers = {};
    const token = this.tokenService.getToken();

    if (token) {
      headers = { Authorization: `Bearer ${token}` }; 
    } 
    else {
      alert("Need to be logged in to upload a video!");
    }

    this.http.post('http://localhost:3000/save-video', video, { headers }).subscribe(() => {
      this.getVideos();
    });
  }

  getBookmarkedVideos() {
    let headers = {};
    const token = this.tokenService.getToken();

    if (token) {
      headers = { Authorization: `Bearer ${token}` };
    }
    else {
      //returns before the get request if user is not logged in
      return;
    }

    this.http.get<Video[]>('http://localhost:3000/bookmarked-videos', { headers }).subscribe((videos) => {
      this.bookmarkedVideosSignal.set(videos);
    });
  }

  getBookmarkedVideosByUserId(userId: number) {
    let headers = {};
    const token = this.tokenService.getToken();

    if (token) {
      headers = { Authorization: `Bearer ${token}` };
    }
    else {
      //returns before the get request if user is not logged in
      return;
    }

    this.http.get<Video[]>(`http://localhost:3000/bookmarked-videos/${userId}`, { headers }).subscribe((videos) => {
      this.bookmarkedVideosSignal.set(videos);
    });
  }

  postBookmark(video: any) {
    let headers = {};
    const token = this.tokenService.getToken();

    if (token) {
      headers = { Authorization: `Bearer ${token}` };
    } 
    else {
      alert("Need to be logged in to bookmark a video!");
      //no need to return in this case because post request already checks for token
      //return;
    }

    this.http.post('http://localhost:3000/save-bookmarked-video', video, { headers }).subscribe(() => {
      this.getBookmarkedVideos();
    });
  }
}
