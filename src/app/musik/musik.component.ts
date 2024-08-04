import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-musik',
  standalone: true,
  templateUrl: './musik.component.html',
  styleUrls: ['./musik.component.css']
})
export class MusikComponent implements OnInit, AfterViewInit {
  audioPlayer!: HTMLAudioElement;
  isPlaying: boolean = false;
  audioSource = '/assets/ph.mp3'; // Ganti dengan path file audio Anda

  constructor() {}

  ngOnInit(): void {
    this.audioPlayer = new Audio();
    this.audioPlayer.src = this.audioSource;

    const shouldPlayMusicStr = localStorage.getItem('shouldPlayMusic');
    this.isPlaying = shouldPlayMusicStr === 'true';

    if (this.isPlaying) {
      this.playMusic();
    }
  }

  ngAfterViewInit(): void {
    this.audioPlayer.autoplay = true;
    this.audioPlayer.loop = true;
    this.audioPlayer.onended = () => {
      this.isPlaying = false;
    };
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
    this.isPlaying = !this.isPlaying;
  }

  playMusic() {
    this.audioPlayer.play();
  }

  pauseMusic() {
    this.audioPlayer.pause();
  }
}
