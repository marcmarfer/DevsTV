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
  bookmarkedVideos: Video[] = [];

  constructor(private videoService: VideoService) {
    effect(() => {
      this.filteredVideos = this.videoService.filteredVideosSignal();
    });
  };

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
    this.bookmarkedVideos = this.videoService.bookmarkedVideosSignal();

    this.videoService.filteredVideosSignal.set(this.videos);
    this.videoService.filteredVideosByCategorySignal.set(this.videos);
  }

  bookmarkVideo(video: Video) {
    const id_user = parseInt(localStorage.getItem('user') ?? '', 10);

    const bookmarkData = {
      id_user: id_user,
      id_video: video.id_video
    };

    this.videoService.postBookmark(bookmarkData);
  }

  // isVideoBookmarked(video: any): boolean {
  //   const id_user = parseInt(localStorage.getItem('user') ?? '', 10);

  //   this.videoService.getBookmarkedVideosByUserId(id_user);

  // return this.bookmarkedVideos.some(bookmarkedVideo => bookmarkedVideo.id_video === video.video_id);
  // }
}
