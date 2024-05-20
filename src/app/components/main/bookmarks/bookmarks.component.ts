import { Component } from '@angular/core';
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

  constructor(private userService: UserService, private videoService: VideoService) {}

  ngOnInit(): void {
    if(this.isLoggedIn()) {
      this.userLogged = this.userService.userLoggedSignal();
      this.videoService.getBookmarkedVideosByUserId(this.userLogged[0].id_user);
      this.bookmarkedVideos = this.videoService.bookmarkedVideosSignal();
    }
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

}
