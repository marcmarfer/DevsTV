import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { Video } from '../../interfaces/Video';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  videos: Video[] = [];
  filteredVideos: Video[] = [];

  constructor(private searchVideoService: VideoService) { }

  searchVideos(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.filteredVideos = this.videos.filter(video =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.searchVideoService.filteredVideosSignal.set(this.filteredVideos);
    console.log(this.filteredVideos);
  }

  ngOnInit(): void {
    this.videos = this.searchVideoService.videosSignal();
    this.filteredVideos = this.videos;
  }
}
