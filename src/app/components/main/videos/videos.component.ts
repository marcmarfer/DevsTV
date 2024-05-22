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
      const newFilteredVideos = this.videoService.filteredVideosSignal();
      if (this.filteredVideos !== newFilteredVideos) {
        this.filteredVideos = newFilteredVideos;
        this.filterVideosByCategory();
      }
    });
  }

  get categories() {
    return Object.values(DevelopmentCategory);
  }

  onCategoryChange() {
    this.filterVideosByCategory();
  }

  filterVideosByCategory() {
    if (this.selectedCategory === 'all') {
      this.filteredVideosByCategory = this.filteredVideos;
    } else {
      this.filteredVideosByCategory = this.filteredVideos.filter(video => video.category === this.selectedCategory);
    }
    if (this.filteredVideosByCategory !== this.videoService.filteredVideosByCategorySignal()) {
      this.videoService.filteredVideosByCategorySignal.update(() => this.filteredVideosByCategory);
    }
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

  deleteBookmark(video: Video) {
    const id_user = parseInt(localStorage.getItem('user') ?? '', 10);
    const bookmarkData = {
      id_user: id_user,
      id_video: video.id_video
    };
    this.videoService.deleteBookmark(bookmarkData);
  }

  isVideoBookmarked(video: any): boolean {
    return this.bookmarkedVideos.some(bookmarkedVideo => bookmarkedVideo.id_video === video.id_video);
  }

}
