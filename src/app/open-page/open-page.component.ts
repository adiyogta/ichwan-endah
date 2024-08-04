import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-open-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './open-page.component.html',
  styleUrl: './open-page.component.css'
})
export class OpenPageComponent implements OnInit {
  brideAndGroom: string = "Ichwan & Endah";
  weddingDate: string = "Dear,";
  guestName: string | null = null;
  isPlaying = true;

  musicStatus() {
    localStorage.setItem('shouldPlayMusic', this.isPlaying ? 'true' : 'false');
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.guestName = this.route.snapshot.paramMap.get('guestName');
  }
}