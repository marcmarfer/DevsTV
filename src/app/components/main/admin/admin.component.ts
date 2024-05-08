import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Video, DevelopmentCategory } from '../../../interfaces/Video';
import { VideoService } from '../../../services/video.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  videoForm: FormGroup = new FormGroup({});
  videos: Video[] = [];

  constructor(private addVideoService: VideoService) {}

  ngOnInit(): void {
    this.videoForm = new FormGroup({
      youtubeURL: new FormControl('', [Validators.required, this.youtubeUrlValidator]),
      thumbnail: new FormControl('', Validators.required),
      reference: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      category: new FormControl(this.categories[0], Validators.required)
    });

    this.videos = this.addVideoService.videosSignal();
  }

  onSubmit() {
    if (this.videoForm.valid) {
      const newVideo: Video = this.videoForm.value;
      this.videos.push(newVideo);
      this.addVideoService.videosSignal.set(this.videos);
      this.videoForm.reset();
    }
  }

  youtubeUrlValidator(videoUrl: FormControl): { [key: string]: any } | null {
    const urlPattern = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    if (videoUrl.value && urlPattern.test(videoUrl.value)) {
      return null;
    } else {
      return { 'invalidYoutubeUrl': { value: videoUrl.value } };
    }
  }

  get categories() {
    return Object.values(DevelopmentCategory);
  }
}
