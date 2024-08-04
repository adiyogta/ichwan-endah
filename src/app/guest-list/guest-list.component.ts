import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { interval, Subscription, BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

interface Guest {
  nama: string;
  ucapan: string;
  kehadiran: string;
  timestamp: number;
}

@Component({
  selector: 'app-guest-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class GuestListComponent implements OnInit, OnDestroy {
  private guestsSubject = new BehaviorSubject<Guest[]>([]);
  guests$: Observable<Guest[]> = this.guestsSubject.asObservable();
  error: string | null = null;
  private updateSubscription!: Subscription;
  private apiUrl: string = 'https://script.google.com/macros/s/AKfycbxz0NL1q5CoCnIgaCOt9mIqwlVOKQQn69aAdwUtBjvn8hL0Kl3NWTDQ3iIzKn6a9F_0/exec';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadGuests();
    this.startAutoRefresh();
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  loadGuests() {
    this.http.get<{data: Guest[]}>(this.apiUrl).pipe(
      tap(response => this.updateGuestList(response.data)),
      catchError(this.handleError.bind(this))
    ).subscribe();
  }

  startAutoRefresh() {
    this.updateSubscription = interval(2000).pipe(
      switchMap(() => this.http.get<{data: Guest[]}>(this.apiUrl).pipe(
        catchError(error => {
          console.error('Error refreshing guests:', error);
          return of(null);
        })
      ))
    ).subscribe(
      response => {
        if (response) {
          this.updateGuestList(response.data);
          this.error = null;
        }
      }
    );
  }

  private updateGuestList(newGuests: Guest[]) {
    const currentGuests = this.guestsSubject.getValue();
    const updatedGuests = this.mergeGuestLists(currentGuests, newGuests);
    this.guestsSubject.next(updatedGuests);
  }

  private mergeGuestLists(currentGuests: Guest[], newGuests: Guest[]): Guest[] {
    const mergedGuests = [...currentGuests];
    
    newGuests.forEach(newGuest => {
      const existingIndex = mergedGuests.findIndex(g => g.nama === newGuest.nama);
      if (existingIndex === -1) {
        mergedGuests.unshift({...newGuest, timestamp: Date.now()});
      } else {
        mergedGuests[existingIndex] = {...newGuest, timestamp: mergedGuests[existingIndex].timestamp};
      }
    });

    return mergedGuests;
  }

  private handleError(error: HttpErrorResponse) {
    this.error = 'Data tidak dapat diambil. Cek koneksi Anda kembali.';
    return of(null);
  }

  trackByName(index: number, guest: Guest): string {
    return guest.nama;
  }
}