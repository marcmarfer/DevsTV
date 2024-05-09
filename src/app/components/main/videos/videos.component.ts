import { Component, effect } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { DevelopmentCategory, Video } from '../../../interfaces/Video';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})

export class VideosComponent {
  videos: Video[] = [];
  filteredVideos: Video[] = [];
  filteredVideosByCategory: Video[] = [];
  selectedCategory = 'all';

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
      category: DevelopmentCategory.DevOps
    },
    {
      youtubeURL: 'https://www.youtube.com/watch?v=J2X5mJ3HDYE',
      thumbnail: 'https://i.ytimg.com/vi/J2X5mJ3HDYE/maxresdefault.jpg',
      reference: "REF03",
      title: 'titulo 3',
      category: DevelopmentCategory.CloudComputing
    },
    {
      youtubeURL: 'https://www.youtube.com/watch?v=J2X5mJ3HDYE',
      thumbnail: 'https://i.ytimg.com/vi/J2X5mJ3HDYE/maxresdefault.jpg',
      reference: "REF04",
      title: 'titulo 4',
      category: DevelopmentCategory.CloudComputing
    }
  ];

  
  get categories() {
    return Object.values(DevelopmentCategory);
  }

  onCategoryChange() {
    this.filterVideosByCategory();
  }

  filterVideosByCategory() {
    if (this.selectedCategory === 'all') {
      this.filteredVideosByCategory = this.videos;
    } else {
      this.filteredVideosByCategory = this.videos.filter(video => video.category === this.selectedCategory);
    }
    this.videoService.filteredVideosByCategorySignal.update(() => this.filteredVideosByCategory);
    this.videoService.filteredVideosSignal.update(() => this.filteredVideosByCategory);
  }

  ngOnInit(): void {
    this.videos = this.videoService.videosSignal();
    this.filteredVideos = this.videoService.filteredVideosSignal();
    this.filteredVideosByCategory = this.videoService.filteredVideosByCategorySignal();
    
    this.testVideos.forEach(testVideo => {
      if (!this.videos.find(video => video.reference === testVideo.reference)) {
        this.videos.push(testVideo);
      }
    });

    this.videoService.filteredVideosSignal.set(this.videos);
  }
}
