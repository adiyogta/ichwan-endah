import { Routes } from '@angular/router';
import { OpenPageComponent } from './open-page/open-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: ':guestName',
    children: [
      { path: '', title: 'Ichwan & Endah', component: OpenPageComponent },
      { path: 'main', title: 'Ichwan & Endah', component: MainPageComponent },
    ]
  },
  { path: '404', component: NotFoundComponent },
  { path: '', component: NotFoundComponent, pathMatch: 'full' }, // Redirect empty path to 404
  { path: '**', component: NotFoundComponent } // Catch all invalid routes and redirect to 404
];