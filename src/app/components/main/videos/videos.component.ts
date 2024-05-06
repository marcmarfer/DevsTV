import { Component } from '@angular/core';
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

  constructor(private addVideoService: VideoService) { };
  ngOnInit(): void {
    this.videos = this.addVideoService.videosSignal();
    
    //testing videos
    this.videos.push({
      youtubeURL: 'https://www.youtube.com/watch?v=J2X5mJ3HDYE',
      thumbnail: 'https://i.ytimg.com/vi/J2X5mJ3HDYE/maxresdefault.jpg',
      duration: 60,
      title: 'titulo 1',
      category: DevelopmentCategory.GameDevelopment
    });

    this.videos.push({
      youtubeURL: 'https://www.youtube.com/watch?v=J2X5mJ3HDYE',
      thumbnail: 'https://i.ytimg.com/vi/J2X5mJ3HDYE/maxresdefault.jpg',
      duration: 60,
      title: 'titulo 2',
      category: DevelopmentCategory.GameDevelopment
    });

    this.videos.push({
      youtubeURL: 'https://www.youtube.com/watch?v=J2X5mJ3HDYE',
      thumbnail: 'https://i.ytimg.com/vi/J2X5mJ3HDYE/maxresdefault.jpg',
      duration: 60,
      title: 'titulo 3',
      category: DevelopmentCategory.GameDevelopment
    });

    this.videos.push({
      youtubeURL: 'https://www.youtube.com/watch?v=J2X5mJ3HDYE',
      thumbnail: 'https://i.ytimg.com/vi/J2X5mJ3HDYE/maxresdefault.jpg',
      duration: 60,
      title: 'titulo 4',
      category: DevelopmentCategory.GameDevelopment
    });
  }

}
