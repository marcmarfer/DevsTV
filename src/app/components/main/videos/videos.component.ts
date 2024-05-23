import { Component, Inject, effect } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { DevelopmentCategory, Video } from '../../../interfaces/Video';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

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

  constructor(
    private videoService: VideoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const newFilteredVideos = this.videoService.filteredVideosSignal();
        if (this.filteredVideos !== newFilteredVideos) {
          this.filteredVideos = newFilteredVideos;
          this.filterVideosByCategory();
        }
      });
      effect(() => {
        const userId = JSON.parse(localStorage.getItem('user') as string);
        this.videoService.getBookmarkedVideosByUserId(userId);
        const newBookmarkedVideos = this.videoService.bookmarkedVideosSignal();
        if (this.bookmarkedVideos !== newBookmarkedVideos) {
          console.log(this.bookmarkedVideos, newBookmarkedVideos);
          this.bookmarkedVideos = newBookmarkedVideos;
        }
      });
    }
  }

  ngOnInit(): void {
    this.videos = this.videoService.videosSignal();
    this.filteredVideos = this.videoService.filteredVideosSignal();
    this.filteredVideosByCategory = this.videoService.filteredVideosByCategorySignal();
    
    if (isPlatformBrowser(this.platformId)) {
      const userId = JSON.parse(localStorage.getItem('user') as string);
      this.videoService.getBookmarkedVideosByUserId(userId);
      this.bookmarkedVideos = this.videoService.bookmarkedVideosSignal();
    }

    this.videoService.filteredVideosSignal.set(this.videos);
    this.videoService.filteredVideosByCategorySignal.set(this.videos);
  }

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

  bookmarkVideo(video: Video) {
    if (isPlatformBrowser(this.platformId)) {
      const id_user = parseInt(localStorage.getItem('user') ?? '', 10);
      const bookmarkData = {
        id_user: id_user,
        id_video: video.id_video
      };
      this.videoService.postBookmark(bookmarkData);
    }
  }

  deleteBookmark(video: Video) {
    if (isPlatformBrowser(this.platformId)) {
      const id_user = parseInt(localStorage.getItem('user') ?? '', 10);
      const bookmarkData = {
        id_user: id_user,
        id_video: video.id_video
      };
      this.videoService.deleteBookmark(bookmarkData);
    }
  }

  isVideoBookmarked(video: any): boolean {
    return this.bookmarkedVideos.some(bookmarkedVideo => bookmarkedVideo.id_video === video.id_video);
  }
}