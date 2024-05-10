import { Injectable, signal } from '@angular/core';
import { Video } from '../interfaces/Video';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class VideoService {
  videosSignal = signal<Video[]>([]);
  filteredVideosSignal = signal<Video[]>([]);
  filteredVideosByCategorySignal = signal<Video[]>([]);

  constructor(private http:HttpClient) { }

  // getVideos() {
  //   this.http.get<Video[]>('https://videos').subscribe((videos) => {
  //     this.videosSignal.set(videos);
  //   })
  // }
}
