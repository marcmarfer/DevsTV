import { Component, effect } from '@angular/core';
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
  filteredVideos: Video[] = [];
  filteredVideosByCategory: Video[] = [];

  constructor(private videoService: VideoService) {
    effect(() => {
      this.filteredVideosByCategory = this.videoService.filteredVideosByCategorySignal();
    });
   }

  searchVideos(event: Event): void {
    console.log(this.filteredVideosByCategory)
    const searchTerm = (event.target as HTMLInputElement).value;
    this.filteredVideos = this.filteredVideosByCategory.filter(video =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.videoService.filteredVideosSignal.update(() => this.filteredVideos);
  }

  ngOnInit(): void {
    this.filteredVideos = this.videoService.filteredVideosSignal();
    this.filteredVideosByCategory = this.videoService.filteredVideosByCategorySignal();
  }
}
