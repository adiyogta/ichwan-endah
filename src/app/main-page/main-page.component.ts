import { Component,AfterViewInit, Renderer2, effect, signal, ViewChild, ElementRef, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MusikComponent } from '../musik/musik.component';
import { FooterComponent } from "../footer/footer.component";
import { GuestListComponent } from "../guest-list/guest-list.component";
import { GuestFormComponent } from "../guest-form/guest-form.component";
import { CommonModule } from '@angular/common';
import { WeddingGiftComponent } from "../wedding-gift/wedding-gift.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MusikComponent, FooterComponent, GuestListComponent, GuestFormComponent, CommonModule, WeddingGiftComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css','./aspect-ratios.css', './backgrounds.css', './typography.css']
})
export class MainPageComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) {this.startCountdown();}

  // ----------------------------------------

  animations = ['fadeInUp', 'fadeInLeft', 'fadeInRight', 'zoomIn', 'bounceIn'];

  @ViewChildren('animatedItem') animatedItems!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.initScrollAnimation();
  }

  private initScrollAnimation() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            this.renderer.setStyle(entry.target, 'opacity', '1');
            this.renderer.addClass(entry.target, 'animate');
            this.renderer.addClass(entry.target, this.animations[index % this.animations.length]);
            this.renderer.addClass(entry.target, 'animated'); // Menandai bahwa elemen telah dianimasikan
            
            // Hapus kelas animasi setelah animasi selesai
            setTimeout(() => {
              this.renderer.removeClass(entry.target, 'animate');
              this.animations.forEach(anim => this.renderer.removeClass(entry.target, anim));
            }, 6000); // Sesuaikan dengan durasi animasi terlama
          }
        });
      },
      { threshold: 0.25 }
    );

    this.animatedItems.forEach(item => observer.observe(item.nativeElement));
  }

// -----------------

  preWeddingImage = 'https://lh3.googleusercontent.com/drive-viewer/AKGpihY6ZyOh4jQV4qpofZQn9iqM7vViQuqroo0vytg7mdPJWCWFyj0T34DZpNkoD7uaLke9dvUK2ACDCIih0W9gUejwWdidHSLruVc=s1600-rw-v1';

  @ViewChild('guestList') guestListComponent!: GuestListComponent;

  refreshGuestList() {
    if (this.guestListComponent) {
      this.guestListComponent.loadGuests();
    }
  }


  showModal = false;
  currentIndex = 0;

  openModal(index: number) {
    this.currentIndex = index;
    this.showModal = true;
    this.disableScroll();
  }

  closeModal() {
    this.showModal = false;
    this.enableScroll();
  }


  private disableScroll() {
    this.renderer.addClass(document.body, 'overflow-hidden');
  }

  private enableScroll() {
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }

  private targetDate = new Date('2024-08-07T09:00:00+07:00');
  
  countdown = signal({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  private startCountdown() {
    effect(() => {
      const intervalId = setInterval(() => this.updateCountdown(), 1000);
      return () => clearInterval(intervalId);  // Cleanup function
    });
  }

  private updateCountdown() {
    const now = new Date();
    const diff = this.targetDate.getTime() - now.getTime();

    if (diff > 0) {
      this.countdown.set({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      });
    } else {
      this.countdown.set({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  }
}