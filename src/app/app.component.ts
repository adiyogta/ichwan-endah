import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BgComponent } from "./bg/bg.component";
import { OpenPageComponent } from './open-page/open-page.component';
import { MainPageComponent } from './main-page/main-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BgComponent, OpenPageComponent, MainPageComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ichwan-endah';
}
