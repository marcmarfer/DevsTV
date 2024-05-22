import { Component, effect } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Video } from '../../../interfaces/Video';
import { VideoService } from '../../../services/video.service';
import { User } from '../../../interfaces/User';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.css'
})

export class BookmarksComponent {
  bookmarkedVideos: Video[] = [];
  userLogged: User[] = [];

  constructor(private userService: UserService, private videoService: VideoService) {
    effect(() => {
      this.bookmarkedVideos = this.videoService.bookmarkedVideosSignal();
    });
  }

  ngOnInit(): void {
    if(this.isLoggedIn()) {
      const userId = JSON.parse(localStorage.getItem('user') as string);
      this.videoService.getBookmarkedVideosByUserId(userId);
      // this.userService.getUserById(userId);
    }
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

}
