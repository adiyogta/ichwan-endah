import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-wedding-gift',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wedding-gift.component.html',
  styleUrl: './wedding-gift.component.css'
})
export class WeddingGiftComponent {
  showBankCards = false;
  showToast = false;
  toastMessage = '';
  toastBackground = '';

  showQRModal: boolean = false;

  openQRModal() {
    this.showQRModal = true;
  }

  closeQRModal() {
    this.showQRModal = false;
  }

  toggleBankCards() {
    this.showBankCards = !this.showBankCards;
  }
  

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        this.showToastMessage('Nomor rekening berhasil disalin, Terima Kasih', 'success');
      },
      (err) => {
        this.showToastMessage('Gagal menyalin nomor rekening', 'error');
      }
    );
  }

  showToastMessage(message: string, type: string) {
    this.toastMessage = message;
    this.showToast = true;

    // Memilih warna latar belakang berdasarkan jenis pesan
    if (type === 'success') {
      this.toastBackground = 'bg-green-500';
    } else if (type === 'error') {
      this.toastBackground = 'bg-red-500';
    }

    setTimeout(() => {
      this.showToast = false;
    }, 2000); // Hapus toast setelah 3 detik
  }
}

