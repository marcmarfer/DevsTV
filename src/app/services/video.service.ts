import { Injectable, signal } from '@angular/core';
import { Video } from '../interfaces/Video';

@Injectable({
  providedIn: 'root'
})

export class VideoService {
  videosSignal = signal<Video[]>([]);
  filteredVideosSignal = signal<Video[]>([]);
  filteredVideosByCategorySignal = signal<Video[]>([]);

  constructor() { }
}
