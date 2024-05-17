import { Component, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { Video } from '../../interfaces/Video';
import { TokenService } from '../../services/token.service';

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

  constructor(private videoService: VideoService, private tokenService: TokenService) {
    effect(() => {
      this.filteredVideosByCategory = this.videoService.filteredVideosByCategorySignal();
    });
   }

  searchVideos(event: Event): void {
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

  removeToken(): void {
    this.tokenService.removeToken();
  }
}
