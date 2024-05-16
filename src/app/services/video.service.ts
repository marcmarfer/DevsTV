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

    this.http.post('http://localhost:3000/save-video', video, { headers }).subscribe(() => {
      this.getVideos();
    });
  }

}
