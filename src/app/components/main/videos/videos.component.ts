import { Component, effect } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { DevelopmentCategory, Video } from '../../../interfaces/Video';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent {
  videos: Video[] = [];
  filteredVideos: Video[] = [];

  constructor(private videoService: VideoService) {
    effect(() => {
      this.filteredVideos = this.videoService.filteredVideosSignal();
    });
   };

  testVideos: Video[] = [
    {
      youtubeURL: 'https://www.youtube.com/watch?v=J2X5mJ3HDYE',
      thumbnail: 'https://i.ytimg.com/vi/J2X5mJ3HDYE/maxresdefault.jpg',
      reference: "REF01",
      title: 'titulo 1',
      category: DevelopmentCategory.GameDevelopment
    },
    {
      youtubeURL: 'https://www.youtube.com/watch?v=J2X5mJ3HDYE',
      thumbnail: 'https://i.ytimg.com/vi/J2X5mJ3HDYE/maxresdefault.jpg',
      reference: "REF02",
      title: 'titulo 2',
      category: DevelopmentCategory.GameDevelopment
    },
    {
      youtubeURL: 'https://www.youtube.com/watch?v=J2X5mJ3HDYE',
      thumbnail: 'https://i.ytimg.com/vi/J2X5mJ3HDYE/maxresdefault.jpg',
      reference: "REF03",
      title: 'titulo 3',
      category: DevelopmentCategory.GameDevelopment
    },
    {
      youtubeURL: 'https://www.youtube.com/watch?v=J2X5mJ3HDYE',
      thumbnail: 'https://i.ytimg.com/vi/J2X5mJ3HDYE/maxresdefault.jpg',
      reference: "REF04",
      title: 'titulo 4',
      category: DevelopmentCategory.GameDevelopment
    }
  ];

  ngOnInit(): void {
    this.videos = this.videoService.videosSignal();
    this.filteredVideos = this.videoService.filteredVideosSignal();
    
    this.testVideos.forEach(testVideo => {
      if (!this.videos.find(video => video.reference === testVideo.reference)) {
        this.videos.push(testVideo);
      }
    });
    
    this.videoService.filteredVideosSignal.set(this.videos);
  }
}
